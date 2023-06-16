$(function () {

    var totalOrder1 = 0;
    localStorage.setItem("totalOrder" , totalOrder1);

    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 



    //Crea boton de producto con la consulta sql en el archivo consulbtnPro.php
    $(document).on('click', '.btn-addPro-p', function(event){
        event.preventDefault();
        $.ajax({
            url: "php/consulbtnPro.php",
            type: "GET",
            success: function(response){
                const employees = JSON.parse(response);

                let templete = ``;


                employees.forEach(emplo =>
                    {
                        templete +=`
                            <button id="id_product" taskid = "${emplo.id_producto}" class="btn btn-pro-p" type="button" value="${emplo.id_producto}">${emplo.nombreProducto}</button>
                        `;

                })
                $("#btnProductSel").html(templete);
            } 

            
        })

    });

/*
    $('#finOr').click(function(){

        var docu = document.querySelector("#documentCli").value;
        var name = document.querySelector("#nameClient").value;
        var idEmplo = localStorage.getItem("id_Empleado");

        var totalOrder = document.querySelector("#labelInputNum").value;
        var check = document.getElementById('confirmOrder').checked;

        const data = new FormData();
        data.append("totalOrder",totalOrder);
        data.append("document",docu);
        data.append("name",name);
        data.append("idEmplo",idEmplo);

        $.ajax({
                url : 'tu_url',
                data : data, 
                method : 'post', //en este caso
                dataType : 'json',
                success : function(response){
                       //codigo de exito
                },
                error: function(error){
                       //codigo error
                }
        });
});*/


    

    //Seleciona el boton para agregar a pedido
    $(document).on('click','.btn-pro-p', function(e) {

        const element = e.target;

        const id = $(this).attr("taskid");

                                    
       // employees.push(emplo); 


 
        $.ajax({
            url: "php/order/showProOrder.php",
            data: { id },
            type: "POST",

            success: function(response){
                
                if(!response.error){

                    employees = JSON.parse(response);

                    const repeat = carrito.some((repeatProduct) => repeatProduct.id === employees[0].idbtnproduct);

                    contador= 1 ; 
                    contadorCarrito = 1;
                    //totalOr= carrito.precio ;

                    if(repeat){

                        carrito.map((prod) =>{

                            if(prod.id === employees[0].idbtnproduct){

                                prod.cantidad++

                            }

                        }); 
                    }else{
                    
                    carrito.push({
                        idCarrito : contadorCarrito++,
                        
                        id: employees[0].idbtnproduct , 

                        nombre: employees[0].nombreProducto , 
    
                        precio: employees[0].precioProducto , 
    
                        cantidad: contador
                    });

                    /*carrito.push({
                        idCarrito : contadorCarrito++,

                        pedido : [{id: employees[0].idbtnproduct , 

                            nombre: employees[0].nombreProducto , 
    
                            precio: employees[0].precioProducto , 
    
                            cantidad: contador}]
                    });*/

                }
                    
                    mostrarProductosCarrito();


                }


            }



        });

    });




    const mostrarProductosCarrito = () => {

        // Limpiar la tabla
        $("#secOrder").empty();

   
       // Agregar los productos actualizados al carrito
       carrito.forEach(producto => {
           const templete = `
               <tr class="product-row" taskid="${producto.id}">
                   <td>${producto.nombre}</td>
                   <td>${producto.precio}</td>
                   <td class="restar"><span>-</span></td>
                   <td class="cantidad">${producto.cantidad}</td>
                   <td class="sumar"><span>+</span></td>
                   <td>
                       <button type="button" class="btn btn-outline-danger btn-p-delete" taskid="${producto.id}">
                           <i class="bi bi-trash3-fill"></i>
                       </button>
                   </td>
               </tr>
           `;
          $("#secOrder").append(templete);
          $(".restar").css("cursor", "pointer");
          $(".sumar").css("cursor", "pointer");
       });

       saveLocal();
       calculateOrder();

       
          $(".restar").on("click", function() {

            const row = $(this).closest(".product-row");

            const index = row.attr("taskid"); 

            const cantidadElement = row.find(".cantidad");

            const product = carrito.find(producto => producto.id === index); 


            if (product && product.cantidad > 1) {


                product.cantidad--;
                
                /*
                localStorage.setItem("totalOrder" , total);
                product.total = total;

                cantidadElement.text(product.cantidad);
                totalElement.text(total);*/

                cantidadElement.text(product.cantidad);

                saveLocal();
                calculateOrder();
               
              
            }
               
          });
          /*
          $(".btn-pro-p").on("click", function() {

            const row = $(".product-row");
            const index = row.attr("taskid");
            const cantidadElement = row.find(".cantidad");
            const totalElement = row.find(".total");
            const product = carrito.find(producto => producto.id === index);

            if (product) {
                product.cantidad++;

                var total = product.total;
                total = product.precio * product.cantidad;
                localStorage.setItem("totalOrder" , total);
                product.total = total;
                cantidadElement.text(product.cantidad);
                totalElement.text(total)
                document.getElementById("labelInputNum").value = "";
            }

            });*/


          $(".sumar").on("click", function() {

            const row = $(this).closest(".product-row");
            const index = row.attr("taskid");
            const cantidadElement = row.find(".cantidad");
            const product = carrito.find(producto => producto.id === index);

            if (product) {
                product.cantidad++;

                total = product.precio * product.cantidad;
                cantidadElement.text(product.cantidad);
                document.getElementById("labelInputNum").value = "";

                saveLocal();
                calculateOrder();
            }

            });



    };




    const eliminarproducto = (e) => {

        const button = $(e.currentTarget);

        const selectedId = button.attr("taskid");

        
        carrito = carrito.filter((carritoId) =>{

            return carritoId.id !== selectedId ; 

        });

        
        mostrarProductosCarrito();

    }; 

    const saveLocal = () => {

        localStorage.setItem("carrito" , JSON.stringify(carrito));
        //localStorage.removeItem('carrito');

        
    }; 

    const calculateOrder = () => {

        var totalOrder = carrito.reduce((sum, value) => (sum + value.precio * value.cantidad /*typeof value.total == "number" ? sum + value.total : sum*/), 0);
        document.getElementById("labelInputNum").value = "";
        document.querySelector("#labelInputNum").value=totalOrder;
        localStorage.setItem("totalOrder" , totalOrder);


        
    }; 

    //eliminar producto 
    
     $(document).on('click', '.btn-p-delete', function(e) {

        e.preventDefault(); 

        eliminarproducto(e); 

     }); 


   
    /*
    //realizar actualizaciones en editar producto
    $(document).on('click','.btn-upload', function(event){
        event.preventDefault();
        const postData = {
            id: $("#eid").val(),
            name: $("#ename").val(),
            price: $("#eprice").val(),
            status: $("#estatus").val(),
            descri: $("#edescri").val()
        }
        $.ajax({
            url: "php/products/uploadProduct.php",
            data: postData,
            type: "POST",
            success: function(response){
                if(!response.error){
                    Swal.fire({
                        icon: 'success',
                        title: 'EXITO!',
                        text: 'Se a relalizado la actualizacion'
                    })
                    $("#formeditPro").trigger("reset");// trigger hace que se recete el formulario al momento de realizar la actualizacion
                    $("#productTbl").trigger("reset");// trigger hace que se recete la tabla
                    $('#editModal').modal('hide');
                }
            }
        })
    });*/

}); 
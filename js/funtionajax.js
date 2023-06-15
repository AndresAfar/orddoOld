$(function () {

    
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

                    if(repeat){

                        carrito.map((prod) =>{

                            if(prod.id === employees[0].idbtnproduct){

                                prod.cantidad++

                            }

                        }); 
                    }else{
                    
                    carrito.push({

                        id: employees[0].idbtnproduct , 

                        nombre: employees[0].nombreProducto , 

                        precio: employees[0].precioProducto , 

                        cantidad: contador 

                    });

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

       
          $(".restar").on("click", function() {

            const row = $(this).closest(".product-row");

            const index = row.attr("taskid"); 

            const cantidadElement = row.find(".cantidad");

            const product = carrito.find(producto => producto.id === index); 


            if (product && product.cantidad > 1) {


                product.cantidad--;

                cantidadElement.text(product.cantidad);

                saveLocal();
               
              
            }
               
          });

          $(".sumar").on("click", function() {

            const row = $(this).closest(".product-row");
            const index = row.attr("taskid");
            const cantidadElement = row.find(".cantidad");
            const product = carrito.find(producto => producto.id === index);

            if (product) {
                product.cantidad++;
                cantidadElement.text(product.cantidad);
                saveLocal();
            }
            
             });



    }; 





    const eliminarproducto = (e) => {

        const button = $(e.currentTarget);

        const selectedId = button.attr("taskid");

        console.log(selectedId); 

        
        carrito = carrito.filter((carritoId) =>{

            return carritoId.id !== selectedId ; 

        });

        saveLocal(); 

        mostrarProductosCarrito(); 

    }; 

    const saveLocal = () => {

        localStorage.setItem("carrito" , JSON.stringify(carrito));
        localStorage.removeItem('carrito');

        
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


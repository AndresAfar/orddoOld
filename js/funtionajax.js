$(function () {

    let templete = ``;

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
    $(document).on('click','.btn-pro-p', ()=>{
        const element = $(this)[0].activeElement;

        const id = $(element).attr("taskid");
        $.ajax({
            url: "php/order/showProOrder.php",
            data: { id },
            type: "POST",
            success: function(response){
                if(!response.error){
                    const employees = JSON.parse(response);
                    employees.forEach(emplo =>
                        {
                            templete += `
                            <tr id="taskid" taskid = "${emplo.idbtnproduct}">
                                <td>${emplo.nombreProducto}</td>
                                <td>${emplo.precioProducto}</td>
                                <td><button type="button" class="btn btn-outline-danger btn-p-delete" ><i class="bi bi-trash3-fill"></i></button></td>
                            </tr>
                            `;

                    })
                    $("#secOrder").html(templete);

                }
            }
        })
    });


    //eliminar producto de labla pedido
    $(document).on('click', '.btn-p-delete', function(event) {
        event.preventDefault();
        const element = $(this)[0].activeElement;
        const id = $(element).attr("taskid");

        console.log(id);

        $(this).closest('tr').remove();
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

})

function loadComands(){

    $.ajax({
        url: "php/order/cosultNum.php",
        type: "GET",

        success: function(response){
            if(!response.error){
                const orders = JSON.parse(response);

                let templete = ``;


                orders.forEach(emplo =>{
                        templete +=`
                            <button id="" taskid = "${emplo.id_pedido}" class="btn div-comand" type="button" value="${emplo.id_pedido}" onclick="infoOrder(${emplo.id_pedido})">${emplo.id_pedido}</button>
                        `;
                })
                $("#orderComand").html(templete);
            }
        }
    })
}

function infoOrder(id){
        $.ajax({
            url: "php/order/consultComand.php",
            data: { id },
            type: "POST",

            success: function(response){
                
                if(!response.error){

                    const orders = JSON.parse(response);
                    let templete2 = ``;

                    

                orders.forEach(emplo =>{

                        templete2 +=`
                            
                            <table class="table mt-4">
                                <thead>
                                    <tr class="table-secondary">
                                        <th scope="col">Id</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-light">
                                        <td>${emplo.idProducto}</td>
                                        <td>${emplo.nombreProducto}</td>
                                        <td>${emplo.precioUnitario}</td>
                                        <td>${emplo.cantidad}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <tfoot><div style="height: 3px; width: 100%; background-color: black; border-radius: 3px;"></div></tfoot>
                        `;
                })
                $("#orderComand2").html(templete2);

                }
            }
        });
}
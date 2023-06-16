const ConfirmOrder = async()=>{


    var docu = document.querySelector("#documentCli").value;
    var name = document.querySelector("#nameClient").value;
    var idEmplo = localStorage.getItem("id_Empleado");

    var totalOrder = document.querySelector("#labelInputNum").value;
    var check = document.getElementById('confirmOrder').checked;


    if(name.trim()==='' || docu.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falta informacion de cliente!'
          })
        return;
    }

    if(!valDNI(docu)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Introduce un documento valido!'
          })
        return;
    }
    if(!valName(name)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Introduce un nombre valido!'
          })
        return;
    }
    
    if(check){
        console.log('Ya esta bien');
    }else{
        
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se ha confirmado el pedido',
            showConfirmButton: false,
            timer: 1000
        })
    }
    if(totalOrder == 0){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No hay productos',
            showConfirmButton: false,
            timer: 1000
        })
    }


    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito2 = JSON.stringify(carrito);
    console.log(carrito2);

    let pedido = JSON.parse(localStorage.getItem("pedido")) || []; 
    var idProduct = 0;

    const data2 = new FormData();
    data2.append("document",docu);
    data2.append("name",name);
    data2.append("idEmplo",idEmplo);
    data2.append("totalOrder",totalOrder);

    var res2 = await fetch("php/order/orderRegis.php",{
        method:'POST',
        body: data2
    });
    var result2 = await res2.json();

    if(result2.success == true){
        
        console.log('se ingreso');
        for (var i = 0; i < carrito.length; i++) {
            const data = new FormData();
            
            idProduct = parseInt(carrito[i]["id"]);
            cantidadProduct = carrito[i]["cantidad"];
            
            
            
            //INSERTAR A BASE DE DATOS
            data.append("idProdutc",idProduct);
            data.append("cantidadProduct",cantidadProduct);
    
            console.log(idProduct, cantidadProduct);
            console.log(data2.get('totalOrder'));
            console.log(data2.get('document'));
            console.log(data2.get('name'));
            console.log(data2.get('idEmplo'));
    
            var res = await fetch("php/order/orderRequest.php",{
                method:'POST',
                body: data
            });
    
            var result = await res.json();
    
            if(result.success == true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: result.mess
                })
                document.querySelector("#documentCli").value=""
                document.querySelector("#nameClient").value=""
                setTimeout(()=>{
                    reload();
                },1200)
            }
        }
    }else{
        console.log('error');
    }

    /*
    var res = await fetch("php/order/orderRequest.php", {
        method:'POST',
        body: data
    });

    var result = await res.json();

    if(result.success != true){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.mess
        })
    }*/
    
}


function reload(){
    localStorage.removeItem('carrito');
    window.location.href = window.location.href;
}

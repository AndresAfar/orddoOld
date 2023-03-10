//Cargar productos
const loadProduct = async()=>{
    var res = await fetch("php/products/consulPro.php");
    var reGisHTML = ``;
    var shoPro = await res.json();

    shoPro.date.forEach(item => {
        reGisHTML +=`
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
                <td>${item[4]}</td>
                <td><button class="btn btn-warning" onclick="editProduct(${item[0]})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="editProduct(${item[0]})">Eliminar</button></td>
            </tr>
        `;
    });

    document.querySelector("#productTbl").innerHTML=reGisHTML;
}





//REGISTRO DE PRODUCTO
const registerProduct = async()=>{

    var name = document.querySelector("#name").value;
    var price = document.querySelector("#price").value;
    var status = document.querySelector("#status").value;
    var descri = document.querySelector("#descri").value;
    
    if(name.trim()==='' || 
    price.trim()==='' || 
    status.trim()==='' ||
    descri.trim()===''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Existen campos vacios!'
          })
        return;
    }

    
    //INSERTAR A BASE DE DATOS
    const data = new FormData();
    data.append("name",name);
    data.append("price",price);
    data.append("status",status);
    data.append("descri",descri);


    var res = await fetch("php/products/producRes.php", {
        method:'POST',
        body: data
    });
    var result = await res.json();

    

    if(result.success ==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: result.mess
          })
        document.querySelector("#formaddPro").reset();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.mess
          })
          document.querySelector("#addModal").click();
    }
}
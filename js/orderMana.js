// variables
var productsHTML = ``;



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
                <td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editProduct(${item[0]})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="confirmDelete(${item[0]})">Eliminar</button></td>
            </tr>
        `;
    });
    document.querySelector("#productTbl").innerHTML=reGisHTML;
    if(window.history.replaceState){
        window.history.replaceState(null, null, window.location.href);
    }
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

    

    if(result.success == true){
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

//Eliminar producto
const deleteProduct = async(id_product)=>{

    const data = new FormData();
    data.append("idproduct",id_product);

    var res = await fetch("php/products/producDel.php", {
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
        setTimeout(()=>{
            reload();
        },3000)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.mess
          })
    }
}

//realiza actualizacion en la tabla producto
const uploadProduct=async()=>{
    
    var eid = document.querySelector("#eid").value;
    var ename = document.querySelector("#ename").value;
    var eprice = document.querySelector("#eprice").value;
    var estatus = document.querySelector("#estatus").value;
    var edescri = document.querySelector("#edescri").value;

    if(ename==='' || 
    eprice==='' || 
    estatus==='' ||
    edescri===''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Existen campos vacios!'
          })
        return;
    }

    const data = new FormData();
    data.append("productid",eid);
    data.append("name",ename);
    data.append("price",eprice);
    data.append("status",estatus);
    data.append("descri",edescri);

    var res = await fetch("php/products/uploadProduct.php", {
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
        document.querySelector("#formeditPro").reset();
        setTimeout(()=>{
            reload();
        },3000)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.mess
          })
    }
}

//buscador productos
const loadSearchProduct = async()=>{
    var res = await fetch("php/search.php");
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
            </tr>
        `;
    });
    document.querySelector("#productTbl").innerHTML=reGisHTML;
}

//Cargar producto en boton
const loadBtnProduct = async()=>{
    var res1 = await fetch("php/products/consulPro.php");
    var loadHTML = ``;
    var shoBtnPro = await res1.json();

    shoBtnPro.date.forEach(item => {
        loadHTML +=`
            <button id="id_product" class="btn btn-pro-p" type="button" value="${item[0]}">${item[1]}</button>
        `;
    });
    //onclick="selProduct(${item[0]});"
    document.querySelector("#btnProductSel").innerHTML=loadHTML;
}
/*
//Seleccion de producto
const selProduct = async(idproduct)=>{

    const data = new FormData();
    data.append("idproduct",idproduct);

    var res = await fetch("php/products/selectPro.php", {
        method:'POST',
        body: data
    });

    var result = await res.json();
    

    if(result.dates != false){
        result.data.forEach(item => {
            productsHTML +=`

                <tr class="data-row">
                    <td><label for="product" id="idproduct" value="${item[0]}">${item[1]}</label></td>
                    <td><label id="priceProduct" class="priceProduct">${item[2]}</td>
                    <td><button type="button" class="btn btn-outline-danger btn-p-delete" ><i class="bi bi-trash3-fill"></i></button></td>
                </tr>
            `;
        });
        document.querySelector("#secOrder").innerHTML=productsHTML;
        //<input class="form-check-input mx-5px" type="checkbox" value="${item[0]}" id="flexCheckDefault">
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe producto!'
          })
        return;
    }
}
*/


//Mostrar datos en tablas sin posibilidad de editar esa informacion
const loadProductTblShow = async()=>{
    var res = await fetch("php/products/consulPro.php");
    var productsHTML = ``;
    var shoPro = await res.json();

    shoPro.date.forEach(item => {
        productsHTML +=`
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
            </tr>
        `;
    });

    document.querySelector("#productTbl2").innerHTML=productsHTML;
}

//Mostrar datos en tablas sin posibilidad de editar esa informacion
const loadOrderTblShow = async()=>{
    var res = await fetch("php/products/consulPro.php");
    var productsHTML = ``;
    var shoPro = await res.json();

    shoPro.date.forEach(item => {
        productsHTML +=`
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
            </tr>
        `;
    });

    document.querySelector("#employeesTbl2").innerHTML=productsHTML;
}

//funcion para cargar productos editados
const editProduct=async(id_product)=>{
    const data = new FormData();
    data.append("productid",id_product);

    var res = await fetch("php/products/loadProduct.php", {
        method:'POST',
        body: data
    });
    var result = await res.json();

    document.querySelector("#eid").value=result.productid;
    document.querySelector("#ename").value=result.name;
    document.querySelector("#eprice").value=result.price;
    document.querySelector("#estatus").value=result.status;
    document.querySelector("#edescri").value=result.descri;
    
}


//recargar pagina
function reload(){
    window.location.href = window.location.href;
}

//funcion para confirmacion para eliminar producto 
function confirmDelete(id){
    Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
        }
    })
}

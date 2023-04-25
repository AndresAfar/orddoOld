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

//Cargar producto en boton
const loadBtnProduct = async()=>{
    var res1 = await fetch("php/products/consulPro.php");
    var loadHTML = ``;
    var shoBtnPro = await res1.json();

    shoBtnPro.date.forEach(item => {
        loadHTML +=`
            <button class="btn btn-pro-p" type="button">${item[1]}</button>
        `;
    });

    document.querySelector("#btnProductSel").innerHTML=loadHTML;
}

//Subir producto seleccionado a la orden
const loadProductOrder = async()=>{
    var res = await fetch("php/products/consulPro.php");
    var loadHTML = ``;
    var shoPro = await res.json();

    shoPro.date.forEach(item => {
        loadHTML +=`
            <tr>
                <td><button class="btn btn-pro-p-order" type="button">${item[1]}</button></td>
            </tr>
        `;
    });

    document.querySelector("#secOrder").innerHTML=loadHTML;
}

//Seleccion
const selProduct = async()=>{
    var res = await fetch("php/products/consulPro.php");
    var loadHTML = ``;
    var shoPro = await res.json();

    shoPro.date.forEach(item => {
        loadHTML +=`
            <tr>
                <td><button class="btn btn-pro-p-order" type="button">${item[1]}</button></td>
            </tr>
        `;
    });

    document.querySelector("#secOrder").innerHTML=loadHTML;
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

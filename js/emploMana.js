//Cargar roles
const loadroleEmplo = async()=>{
    var res = await fetch("php/employe/consulrol.php");
    var roleHTML = ``;
    var shoPro = await res.json();

    shoPro.date.forEach(item => {
        roleHTML +=`
            <option value="${item[0]}">${item[1]}</option>
        `;
    });
    document.querySelector("#jobPos").innerHTML=roleHTML;
}



//Cargar empleados
const loadEmployees = async()=>{
    var res2 = await fetch("php/employe/consulEmplo.php");
    var emploHTML = ``;
    var shoEm = await res2.json();

    shoEm.data.forEach(item => {
        emploHTML +=`
            <tr>
                <td>${item[2]}</td>
                <td>${item[5]}</td>
                <td>${item[6]}</td>
                <td>${item[7]}</td>
                <td><button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModalEmplo" onclick="editEmplo(${item[0]})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="confirmDelete(${item[0]})">Eliminar</button></td>
            </tr>
        `;
    });
    document.querySelector("#employeesTbl").innerHTML=emploHTML;
}

//Consultar id de empelado
const idEmplo = async()=>{
    
    var username = localStorage.getItem("username");
    var id_emplo = localStorage.getItem("idEmple");
    
    const data = new FormData();
    data.append("usernamer",username);
    
    var res = await fetch("php/employe/emploId.php", {
        method:'POST',
        body: data
    });
    var result = await res.json();
    localStorage.setItem("idEmple", result.idEmpleado)
}


//Eliminar empleado
const deleteEmplo = async(id_emplo)=>{

    const data = new FormData();
    data.append("idEmplo",id_emplo);

    var res = await fetch("php/employe/deleteEmplo.php", {
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
        },2000)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.mess
          })
    }
}

//Editar empleado
const editEmplo=async(id_emplo)=>{
    const data = new FormData();
    data.append("emploid",id_emplo);

    var res = await fetch("php/employe/loadEmploEdit.php", {
        method:'POST',
        body: data
    });
    var roleHTML = ``;
    var result = await res.json();

    document.querySelector("#edocument").value=result.documento;
    document.querySelector("#euser").value=result.usuario;
    document.querySelector("#epassword").value=result.contrasena;
    document.querySelector("#efirst-name").value=result.nombre;
    document.querySelector("#elast-name").value=result.apellido;
    document.querySelector("#ephone-number").value=result.telefono;
    localStorage.setItem('id_Empleado', result.emploid);

    if(result.cargo == 'Em. General'){
        roleHTML +=`
            <option value="2" selected>Em .General</option>
            <option value="1" >Administrador</option>
        `;
        document.querySelector("#ejobPos").innerHTML=roleHTML;
    }else{
        roleHTML +=`
            <option value="1" selected>Administrador</option>
            <option value="2">Em .General</option>
        `;
        document.querySelector("#ejobPos").innerHTML=roleHTML;
    }
}


const uploadUser= async()=>{

    var idEmplo = localStorage.getItem("id_Empleado");
    var name = document.querySelector("#efirst-name").value;
    var lastName = document.querySelector("#elast-name").value;
    var number = document.querySelector("#ephone-number").value;
    var docu = document.querySelector("#edocument").value;
    var jobPos = document.querySelector("#ejobPos").value;
    var user = document.querySelector("#euser").value;
    var password = document.querySelector("#epassword").value;
    
    if(name.trim()==='' || 
    lastName.trim()==='' || 
    number.trim()==='' || 
    docu.trim()==='' || 
    jobPos.trim()==='' || 
    user.trim()==='' || 
    password.trim()===''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Existen campos vacios!'
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
    if(!valNameLast(lastName)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Introduce un Apellido valido!'
          })
        return;
    }
    if(!valNum(number)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Introduce un numero de telefono valido!'
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
    if(!valUser(user)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Introduce un usuario valido!'
          })
        return;
    }

    //INSERTAR A BASE DE DATOS
    const data = new FormData();
    data.append("idEmple", idEmplo);
    data.append("name",name);
    data.append("lastName",lastName);
    data.append("phone",number);
    data.append("document",docu);
    data.append("jobPos",jobPos);
    data.append("username",user);
    data.append("password",password);


    var res = await fetch("php/employe/updateEmplo.php", {
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
        document.querySelector("#formaddUser").reset();
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
            deleteEmplo(id);
        }
    })
}
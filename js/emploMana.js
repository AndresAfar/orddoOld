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
                <td><button class="btn btn-danger" onclick="deleteEmplo(${item[0]})">Eliminar</button></td>
            </tr>
        `;
    });
    document.querySelector("#employeesTbl").innerHTML=emploHTML;
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
    var result = await res.json();

    document.querySelector("#edocument").value=result.documento;
    document.querySelector("#euser").value=result.usuario;
    document.querySelector("#epassword").value=result.contrasena;
    document.querySelector("#efirst-name").value=result.nombre;
    document.querySelector("#elast-name").value=result.apellido;
    document.querySelector("#ephone-number").value=result.telefono;
    
}
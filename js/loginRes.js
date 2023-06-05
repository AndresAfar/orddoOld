
//REGISTRO DE USUASRIO
const registerUser= async()=>{

    var name = document.querySelector("#first-name").value;
    var lastName = document.querySelector("#last-name").value;
    var number = document.querySelector("#phone-number").value;
    var docu = document.querySelector("#document").value;
    var jobPos = document.querySelector("#jobPos").value;
    var user = document.querySelector("#user").value;
    var password = document.querySelector("#password").value;
    
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
    if(!valPass(password)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Introduce una contraseña valida!'
          })
        return;
    }

    //INSERTAR A BASE DE DATOS
    const data = new FormData();
    data.append("name",name);
    data.append("lastName",lastName);
    data.append("phone",number);
    data.append("document",docu);
    data.append("jobPos",jobPos);
    data.append("username",user);
    data.append("password",password);


    var res = await fetch("php/register.php", {
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

const loginUser= async()=>{

    var user = document.querySelector("#user").value;
    var password = document.querySelector("#password").value;

    if( user.trim()===''|| password.trim()===''){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Existen campos vacios!'
          })
        return;
    }

     //CONSULTAR A BASE DE DATOS PARA LOGIN
     const data = new FormData();
     data.append("username",user);
     data.append("password",password);
 
 
     var res = await fetch("php/login.php", {
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
         document.querySelector("#form_log").reset();
         localStorage.setItem('username',result.username);
         localStorage.setItem('rol',result.rol);
         setTimeout(()=>{
          window.location.href = "homeUP.html";
         },2000)
         
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
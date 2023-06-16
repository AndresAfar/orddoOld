var sesion = localStorage.getItem("username");
var rol = localStorage.getItem("rol");

const checksesion =()=>{
  if(sesion == null){
    window.location.href ="index.html";
  }else{
    document.querySelector('#userVal').innerHTML=sesion;
  }
}

const singOut =()=>{
    localStorage.clear();
    window.location.href ="index.html";
}

const checkpremision =()=>{
    if(rol == 2){
      window.location.href ="homeUP.html";
    }
}

const session=()=>{
  if(rol == 2){
    document.getElementById("sec-gesEmplo").style.visibility = 'hidden';
  }
}
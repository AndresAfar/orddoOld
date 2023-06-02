var sesion = localStorage.getItem("username");
var rol = localStorage.getItem("rol");

const checksesion =()=>{
  if(sesion == null){
    window.location.href ="index.html";
  }else{
    if(rol == 2){
      if(window.location == "emploMana.html"){
        document.getElementById("sec-gesEmplo").style.display = "none";
        console.log("En la pagina");
      }
    }
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
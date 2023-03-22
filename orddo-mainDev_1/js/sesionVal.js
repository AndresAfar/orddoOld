var sesion = localStorage.getItem("username");

const checksesion =()=>{
  if(sesion == null){
    window.location.href ="index.html";
  }
  document.querySelector('#userVal').innerHTML=sesion;
}


const singOut =()=>{
    localStorage.clear();
    window.location.href ="index.html";
  }
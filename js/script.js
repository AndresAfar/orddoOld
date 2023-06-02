
const upVal = document.querySelector('#input');
const button = document.querySelector('#button');

button.addEventListener('click',()=>{
	if(upVal.value.length == 0){
		alert("Los campos no pueden estar vacios")
	}
})
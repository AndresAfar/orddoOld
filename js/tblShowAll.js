

//Buscador productos


const loadSearchProduct = async()=>{

    var nameProduct = document.querySelector("#search").value;
    var infoDiv = ``;
    var searchResult = ``;

    if(nameProduct===''){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El campo esta vacio',
            showConfirmButton: false,
            timer: 1300
          })
    }else{

        const data = new FormData();
        data.append("nameProduct",nameProduct);

        var res = await fetch("php/search.php", {
            method:'POST',
            body: data
        });

        var shoPro = await res.json();
        
        if(shoPro.data.length === 0){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No se ha encontrado ningun producto',
                showConfirmButton: false,
                timer: 1300
              })
        }else{

            shoPro.data.forEach(item => {
                searchResult +=`
                    <tr>
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td>${item[3]}</td>
                        <td>${item[4]}</td>
                        <td><button class="btn btn-warning m-1" style="height: 30px; width: 60px; font-size: 12px;" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editProduct(${item[0]})">Editar</button><button class="btn btn-danger" style="height: 30px; width: 60px; font-size: 12px;" onclick="confirmDelete(${item[0]})">Eliminar</button></td>
                    </tr>
                `;
            });
            document.querySelector("#showSearch").innerHTML=searchResult;
            document.getElementById("consult-result").style.visibility = 'visible';
            document.getElementById("div-result").style.visibility = 'visible';
        }
    }
}



// cargar proudctos sin 

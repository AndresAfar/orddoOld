$(function () {

    $("#consult-result").hide();
    fecthEmplos();
    fecthProdutcs();

    


    //se consulta  de datos en el buscador de la pagina
    $("#search").keyup(()=>{
        if($("#search").val()){
            let search = $("#search").val();

            $.ajax({
                url: "php/consult-em.php",
                data: {search},
                type: "POST",
                success: function(response){
                    if(!response.error){
                        let emplos = JSON.parse(response);
                        let templete = ``;

                        emplos.forEach(emplo => {
                            templete += `<li><a href="#" class="task-item">${emplo.document}</a></li>`
                        });
                        $("#consult-result").show();
                        $("#container").html(templete);
                    }
                }
            })
        }
    })
    
    //Realiza registro llamando a una funcion fecthEmplos()
    $("#taks-form").submit(e =>{
        e.preventDefault();
        const postData = {
            document: $("#document").val(),
            name: $("#first-name").val(),
            lastName: $("#last-name").val(),
            phone: $("#phone-number").val(),
            email: $("#email").val(),
            jobPos: $("#jobPos").val(),
            username: $("#user").val(),
            password: $("#password").val(),
        }
        $.ajax({
            url: "php/registerUser.php",
            data: postData,
            type: "POST",
            success: function(response){
                if(!response.error){
                    fecthEmplos();// se llama a la funcion de show
                    $("#taks-form").trigger("reset");// trigger hace que se recete el formulario al momento de realizar el registro
                }
            }
        })
    })

    //Funcion que recibe consulta y lo muestra en una tabla con el id "#employeesTbl"
    function fecthEmplos(){
        $.ajax({
            url: "php/showEmplo.php",
            type: "GET",
            success: function(response){
                const employees = JSON.parse(response);
                let templete = ``;
                employees.forEach(emplo =>
                    {
                        templete += `
                        <tr id="taskid" taskid = "${emplo.document}">
                            <td>${emplo.document}</td>
                            <td>${emplo.name}</td>
                            <td>${emplo.lastName}</td>
                            <td>${emplo.email}</td>
                            <td>${emplo.numPhone}</td>
                            <td>${emplo.jobPos}</td>
                            <td><button id="taskid1" class="btn btn-danger taskEdit">Editar</button></td>
                            <td><button id="taskid2" class="btn btn-danger taskDelete">Eliminar</button></td>
                        </tr>
                        `;

                })
                $("#employeesTbl").html(templete);
            }
        })
    }

    function fecthProdutcs(){
        $.ajax({
            url: "php/products/consulPro.php",
            type: "GET",
            success: function(response){
                const employees = JSON.parse(response);
                let templete = ``;
                employees.forEach(item =>
                    {
                        templete += `
                        <tr>
                            <td>${emplo.document}</td>
                            <td>${item[1]}</td>
                            <td>${item[2]}</td>
                            <td>${item[3]}</td>
                            <td>${item[4]}</td>
                            <td><button class="btn btn-warning" onclick="editProduct(${item[0]})">Editar</button></td>
                            <td><button class="btn btn-danger" onclick="deleteProduct(${item[0]})">Eliminar</button></td>
                        </tr>
                        `;

                })
                $("#productTbl").html(templete);
            }
        })
    }

    /*
    $(document).on('click', '.taskDelete', ()=>{
        /*if(confirm("¿Estas seguro(a) de eliminar esto?")){
            const element = $(this)[0].activeElement.parentElement.parentElement;
            console.log(element);
        }*/
        
        
        /*
        const el = document.getElementById('taskid');
        console.log(el.closest('#taskid'));*/
        Swal.fire({
            title: '¿Estas seguro(a)?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Eliminado!',
                'El empleado ha sido eliminado del sistema.',
                'success')
            }
          })
    })




    //validacion de login
    $("#form_log").submit(e =>{
        e.preventDefault();
        const postData = {
            username: $("#user").val(),
            password: $("#password").val(),
        }
        $.ajax({
            url: "php/loginUser.php",
            data: postData,
            type: "POST"
        })
            /*
            var user = document.querySelector("#user").value();
            var password = document.querySelector("#password").value();
    
            if(user.trim()==='' || password.trim() === ''){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Existen campos vacios',
                })
                return;
            }
            if(!valuser(user)){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Ingresa un usuario',
                })
                return;
            }
            if(!valuser(password)){
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: 'Ingresa una contraseña',
                })
                return;
            }
    })*/

})


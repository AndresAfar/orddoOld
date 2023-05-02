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
                <td><button class="btn btn-warning" onclick="editProduct(${item[0]})">Editar</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${item[0]})">Eliminar</button></td>
            </tr>
        `;
    });
    document.querySelector("#employeesTbl").innerHTML=emploHTML;
}
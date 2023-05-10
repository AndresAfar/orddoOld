<?php

require_once 'connection.php';

$options = [
    'cost' => 12,
];


$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    
    $consult_document = $_POST["document"];
    $consult_name = $_POST["name"];
    $consult_lastName = $_POST["lastName"];
    $consult_phone = $_POST["phone"];
    $consult_jobPos = $_POST["jobPos"];

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    //casteo de string a entero
    $casjobPos = (int)$consult_jobPos;


    $passwordEncrypt = $consult_password;


    $hash = password_hash($passwordEncrypt, PASSWORD_BCRYPT, $options);
    if ($hash === false) {
        die('Error al encriptar la contraseña');
    }

    $sql = "SELECT * FROM usuario WHERE usuario = '$consult_username'";
    $result = $connection->query($sql);
    $n = $result->num_rows;

    if($n === 0){

        $sqlInsert2 = "INSERT INTO usuario(rol_id_rol, documento, usuario, contrasena, nombre, apellido, telefono) VALUES('$casjobPos','$consult_document','$consult_username', '$consult_password','$consult_name','$consult_lastName','$consult_phone')";

        if($connection->query($sqlInsert2)=== true){

            $val['success']=true;
            $val['mess']="Se registro correctamente";

        }else{

            $val['success']=false;
            $val['mess']="Error en el registro";
            
        }

    }
    else{

        $val['success']=false;
        $val['mess']="El usuario ya existe";

    }
}
else{

    $val['success']=false;
    $val['mess']="No se realizo registro";

}

echo json_encode($val);



?>
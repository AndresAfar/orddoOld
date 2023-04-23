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
    $consult_email = $_POST["email"];
    $consult_jobPos = $_POST["jobPos"];

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    $passwordEncrypt = $consult_password;


    $hash = password_hash($passwordEncrypt, PASSWORD_BCRYPT, $options);
    if ($hash === false) {
        die('Error al encriptar la contraseña');
    }

    $sql = "SELECT * FROM usuario WHERE usuario = '$consult_username'";
    $result = $connection->query($sql);
    $n = $result->num_rows;

    if($n === 0){

        $sqlInsert2 = "INSERT INTO usuario(usuario, contrasena) VALUES('$consult_username', '$consult_password')";

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
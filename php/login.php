<?php

require_once 'connection.php';

$options = [
    'cost' => 12,
];


$val['success']=array('success' =>false, 'mess'=>"", 'username'=>"");


if($_POST){

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    $sqlConsult2 = "SELECT * FROM usuario WHERE usuario = '$consult_username'";
    $sqlResult2 = $connection->query($sqlConsult2);
    $n = $sqlResult2->num_rows;
    if($n > 0){
        $row = $sqlResult2->fetch_array();
        $val['username']=strtoupper($row['usuario']);
    }

    $contraDes =password_verify($consult_password, PASSWORD_DEFAULT);

    $sqlConsult = "SELECT contrasena FROM usuario WHERE usuario = '$consult_username'";
    $sqlResult = $connection->query($sqlConsult);
    $n2 = $sqlResult->num_rows;
    $resgis = mysqli_fetch_assoc($sqlResult);
    

    if($n2 > 0){
        $val['success']=true;
        $val['mess']="Bienvenido";
    }else{
        $val['success']=false;
        $val['mess']="Usuario o contrasena incorrecta";
    }
}else{
    $val['success']=false;
    $val['mess']="Error al iniciar sesion";
}

echo json_encode($val);



?>
<?php

require_once 'connection.php';

$options = [
    'cost' => 12,
];


$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    $sqlConsult = "SELECT * FROM users WHERE username = '$consult_username' AND password = '$consult_password'";
    $sqlResult = $connection->query($sqlConsult);
    $n = $sqlResult->num_rows;
    if($n > 0){

        $val['success']=true;
        $val['mess']="Bienvenido";
    }else{
        $val['success']=false;
        $val['mess']="El Error al iniciar sesion";
    }
}else{
    $val['success']=false;
    $val['mess']="No se realizo registro";
}

echo json_encode($val);



?>
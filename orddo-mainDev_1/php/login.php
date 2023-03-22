<?php

require_once 'connection.php';

$options = [
    'cost' => 12,
];


$val['success']=array('success' =>false, 'mess'=>"", 'username'=>"");


if($_POST){

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    $sqlConsult2 = "SELECT * FROM users WHERE username = '$consult_username'";
    $sqlResult2 = $connection->query($sqlConsult2);
    $n = $sqlResult2->num_rows;
    if($n > 0){
        $row = $sqlResult2->fetch_array();
        $val['username']=strtoupper($row['username']);
    }

    $sqlConsult = "SELECT password FROM users WHERE username = '$consult_username'";
    $sqlResult = $connection->query($sqlConsult);
    $resgis = mysqli_fetch_assoc($sqlResult);
    $hash = $resgis['password'];

    if(password_verify($consult_password,$hash)){
        $val['success']=true;
        $val['mess']="Bienvenido";
    }else{
        $val['success']=false;
        $val['mess']="Usuario o contrasena incorrecta";
    }
/*
    $n = $sqlResult->num_rows;
    if($n > 0){

        $val['success']=true;
        $val['mess']="Bienvenido";
    }else{
        $val['success']=false;
        $val['mess']="El Error al iniciar sesion";
    }*/
}else{
    $val['success']=false;
    $val['mess']="Error al iniciar sesion";
}

echo json_encode($val);



?>
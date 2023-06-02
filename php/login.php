<?php

require_once 'connection.php';

$options = [
    'cost' => 12,
];


$val['success']=array('success' =>false, 'mess'=>"", 'username'=>"");


if($_POST){

    $consult_username = $_POST["username"];
    $consult_password = md5($_POST["password"]);


    $sqlConsult2 = "SELECT * FROM usuario WHERE usuario = '$consult_username'";
    $sqlResult2 = $connection->query($sqlConsult2);
    $n = $sqlResult2->num_rows;
    if($n > 0){
        $row = $sqlResult2->fetch_array();
        $val['username']=strtoupper($row['usuario']);
    }

    $sqlConsult3 = "SELECT rol_id_rol FROM usuario WHERE usuario = '$consult_username'";
    $sqlResult3 = $connection->query($sqlConsult3);
    $n = $sqlResult3->num_rows;
    if($n > 0){
        $row = $sqlResult3->fetch_array();
        $val['rol']=$row['rol_id_rol'];
    }

    $sqlConsult = "SELECT * FROM usuario WHERE usuario = '$consult_username' AND  contrasena = '$consult_password'";
    //$sqlResult = $connection->query($sqlConsult);
    $resutlado = mysqli_query($connection, $sqlConsult);
    

    if($resutlado){
        $row2 = mysqli_num_rows($resutlado);
        if($row2!=0){
            $val['success']=true;
            $val['mess']="Bienvenido";
        }
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
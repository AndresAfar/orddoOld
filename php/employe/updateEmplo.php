<?php

require_once '../connection.php';

$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    
    $consult_id = $_POST["idEmple"];
    $consult_document = $_POST["document"];
    $consult_name = $_POST["name"];
    $consult_lastName = $_POST["lastName"];
    $consult_phone = $_POST["phone"];
    $consult_jobPos = $_POST["jobPos"];

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    //casteo de string a entero
    $casjobPos = (int)$consult_jobPos;

    $hash = md5($consult_password);

    $parseID = (int)$consult_id;
    $hash = md5($consult_password);

    
    $sql = "UPDATE usuario SET rol_id_rol = '$consult_jobPos', documento = '$consult_document', usuario = '$consult_username', contrasena = '$hash', nombre = '$consult_name', apellido = '$consult_lastName', telefono = '$consult_phone' WHERE id_usuario = '$parseID'";

    $result = mysqli_query($connection, $sql);

    if(!$result){
        $val['success']=false;
        $val['mess']="Error en la actualizacion";
    }else{
        $val['success']=true;
        $val['mess']="Se ha realizado la actualizacion";
    }
}
else{

    $val['success']=false;
    $val['mess']="No se realizo registro";

}

echo json_encode($val);



?>
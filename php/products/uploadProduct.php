<?php

require_once '../connection.php';
header("Content-Type: text/html;charset=utf-8");


$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    $consult_id = $_POST["productid"];
    $consult_name = $_POST["name"];
    $consult_price = $_POST["price"];
    $consult_status = $_POST["status"];
    $consult_descri = $_POST["descri"];


    $parseID = (int)$consult_id;

    
    $sql = "UPDATE producto SET nombreProducto = '$consult_name', descripcionProducto = '$consult_descri', precioProducto = '$consult_price', estadoProducto = '$consult_status' WHERE id_producto = '$parseID'";

    $result = mysqli_query($connection, $sql);

    if(!$result){
        $val['success']=false;
        $val['mess']="Error en la actualizacion";
    }else{
        $val['success']=true;
        $val['mess']="Se ha realizado la actualizacion";
    }
}
echo json_encode($val);

?>
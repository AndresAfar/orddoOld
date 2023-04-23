<?php

require_once '../connection.php';


$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    
    $consult_name = $_POST["name"];
    $consult_price = $_POST["price"];
    $consult_status = $_POST["status"];
    $consult_descri = $_POST["descri"];

    
        $sql = "INSERT INTO producto(nombreProducto,descripcionProducto,precioProducto,estadoProducto) VALUES('$consult_name', '$consult_descri', '$consult_price', '$consult_status')";

        if($connection->query($sql)=== true){
            $val['success']=true;
            $val['mess']="Se registro correctamente";
        }else{
            $val['success']=false;
            $val['mess']="Error en el registro";
        }
}else{
    $val['success']=false;
    $val['mess']="No se realizo registro";
}

echo json_encode($val);



?>
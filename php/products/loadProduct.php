<?php
require_once '../connection.php';
header("Content-Type: text/html;charset=utf-8");


$val['success']=array('success' =>false, 'mess'=>"", 'productid'=>"", 'name'=>"", 'price'=>"", 'status'=>"", 'descri'=>"");

if($_POST){

    $idProduct =$_POST['productid'];

    $sql = "SELECT * FROM producto WHERE id_producto = $idProduct";
    $result= $connection->query($sql);

    $row=$result->fetch_array();
    $val['success']=true;
    $val['mess']="Se encontro producto";
    $val['productid']=$row[0];
    $val['name']=$row[1];
    $val['descri']=$row[2];
    $val['price']=$row[3];
    $val['status']=$row[4];


}else{
    $val['success']=false;
    $val['mess']="No se encontro";
}

$connection->close();
echo json_encode($val);

?>
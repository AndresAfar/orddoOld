<?php
require_once '../connection.php';


$val['success']=array('success' =>false, 'mess'=>"",'productid'=>"",'namePro'=>"",'pricePro'=>"",'statusPro'=>"",'descriPro'=>"");

if($_POST){

    $idProduct =$_POST['productid'];
    $name =$_POST['namePro'];
    $descri =$_POST['descriPro'];
    $price =$_POST['pricePro'];
    $status =$_POST['statusPro'];

    $sql = "SELECT * FROM producto WHERE id_producto = $idProduct";
    $result= $connection->query($sql);

    $row=$result->fetch_array();
    $val['success']=true;
    $val['mess']="Se encontro producto";
    $val['productid']=$row[0];
    $val['namePro']=$row[1];
    $val['descriPro']=$row[2];
    $val['pricePro']=$row[3];
    $val['statusPro']=$row[4];


}else{
    $val['success']=false;
    $val['mess']="No se encontro";
}

$connection->close();
echo json_encode($val);

?>
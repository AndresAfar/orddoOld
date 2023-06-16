<?php

require_once '../connection.php';

date_default_timezone_set('America/Bogota');
date_default_timezone_set('America/Bogota');




$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    
    $consult_docu = $_POST["document"];
    $consult_name = $_POST["name"];
    $consult_idEmplo = $_POST["idEmplo"];
    $consult_totalOrder = $_POST["totalOrder"];


    $consult_descri = "blabla";
    $dateOrder = date('Y-m-d');


    
    $sql = "INSERT INTO cliente(documentoCliente, nombreCliente)  
    SELECT '$consult_docu', '$consult_name'
    WHERE NOT EXISTS(SELECT 1 FROM cliente WHERE documentoCliente = '$consult_docu')";

    $result = $connection->query($sql);

    $sqlConsultCli = "SELECT id_cliente FROM cliente WHERE documentoCliente = '$consult_docu'";

    $resultCli = $connection->query($sqlConsultCli);

    $row=$resultCli->fetch_array();
    $idClient=$row[0];


    $sql2 = "INSERT INTO pedido(usu_id_usuario, cli_id_cliente, totalPedido, fechaPedido) VALUES('$consult_idEmplo', '$idClient', '$consult_totalOrder', '$dateOrder')";
    $resultPe = $connection->query($sql2);

    if($resultPe === true){
        $val['success']=true;
        $val['mess']="Se registro el pedido";

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
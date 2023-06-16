<?php

require_once '../connection.php';


$val['success']=array('success' =>false, 'mess'=>"", 'idEmpleado'=>"");


if($_POST){
    
    $consult_id = strtolower($_POST["usernamer"]);

    $sql = "SELECT * FROM usuario WHERE usuario = '$consult_id'";
    $result= $connection->query($sql);

    $row=$result->fetch_array();
    $val['success']=true;
    $val['mess']="Se encontro correctamente";
    $val['idEmpleado']=$row[0];

}else{
    $val['success']=false;
    $val['mess']="Error en la consulta";
}

echo json_encode($val);



?>
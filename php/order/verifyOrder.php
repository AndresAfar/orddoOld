<?php

require_once '../connection.php';



$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    
    $consult_id = $_POST["contadorCarrito"];


    $query = "SELECT * FROM pedido WHERE id_pedido = '$consult_id'";
    
    $result = $connection->query($sql);
    $n = $result->num_rows;

    if($n != 0){
        
        $val['success']=true;
        $val['mess']="Se registro correctamente";
    }
    else{

        $val['success']=false;
        $val['mess']="El usuario ya existe";

    }
}
else{

    $val['success']=false;
    $val['mess']="No se realizo registro";

}

echo json_encode($val);



?>
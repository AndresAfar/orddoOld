<?php

require_once '../connection.php';

if($_POST){
    
    $consult_id = $_POST["idproduct"];

    
        $sql = "SELECT * FROM producto WHERE id_producto = '$consult_id'";
        $result= $connection->query($sql);
        $dates = array('data' => array());

        //Cargar datos en tabla y para boton
        if($result -> num_rows>0){
            while($row=$result->fetch_array()){
                $dates['data'][]=array($row[0],$row[1],$row[3], $val['success']=true);
            }
        }else{
            $val['success']=false;
            $val['mess']="Error en la busqueda";
        }
}else{
    $val['success']=false;
    $val['mess']="No se encontro registro";
}
echo json_encode($dates);

$connection->close();
?>



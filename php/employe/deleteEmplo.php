<?php

require_once '../connection.php';


$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){
    
    $consult_idEmplo = $_POST["idEmplo"];

    
        $sql = "DELETE FROM usuario where id_usuario = '$consult_idEmplo'";

        if($connection->query($sql)=== true){
            $val['success']=true;
            $val['mess']="Se elimino correctamente";
        }else{
            $val['success']=false;
            $val['mess']="Error en la eliminacion";
        }
}else{
    $val['success']=false;
    $val['mess']="No se encontro database";
}

echo json_encode($val);



?>
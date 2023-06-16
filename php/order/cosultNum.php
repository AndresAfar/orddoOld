<?php
require_once '../connection.php';



    $query = "SELECT * FROM pedido";
    $result = mysqli_query($connection, $query);
    
    if(!$result){
        die ("Hubo un error en la consulta".mysqli_error($connection));
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            "id_pedido"=>$row["id_pedido"],
            "usu_id_usuario"=>$row["usu_id_usuario"],
            "cli_id_cliente"=>$row["cli_id_cliente"],
            "totalPedido"=>$row["totalPedido"],
            "fechaPedido"=>$row["fechaPedido"]
        );
    }

    $jsonsring = json_encode($json);
    echo $jsonsring;


?>
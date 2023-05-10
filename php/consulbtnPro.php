<?php
include("connection.php");


    $query = "SELECT * FROM producto ";
    $result = mysqli_query($connection, $query);
    
    if(!$result){
        die ("Hubo un error en la consulta".mysqli_error($connection));
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            "id_producto"=>$row["id_producto"],
            "nombreProducto"=>$row["nombreProducto"],
            "descripcionProducto"=>$row["descripcionProducto"],
            "precioProducto"=>$row["precioProducto"],
            "estadoProducto"=>$row["estadoProducto"]
        );
    }

    $jsonsring = json_encode($json);
    echo $jsonsring;


?>
<?php
/*
include("connection.php");

$query = "SELECT * FROM usuario";
$result = mysqli_query($connection, $query);

if(!$result){
    die ("Hubo un error en la consulta".mysqli_error($connection));
}

$json = array();

    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            "document"=>$row["emDocument"],
            "name"=>$row["emName"],
            "lastName"=>$row["emLastName"],
            "email"=>$row["emEmail"],
            "numPhone"=>$row["emPhone"],
            "jobPos"=>$row["emJobPos"]
        );
    }

    $jsonsring = json_encode($json);
    echo $jsonsring;*/

    include("../connection.php");



    if($_POST){

        $consult_id = $_POST["id"];

        $query = "SELECT * FROM producto WHERE id_producto = '$consult_id'";
        $result = mysqli_query($connection, $query);
        
        if(!$result){
            die ("Hubo un error en la consulta".mysqli_error($connection));
        }

        $json = array();
    
        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "idbtnproduct"=>$row["id_producto"],
                "nombreProducto"=>$row["nombreProducto"],
                "precioProducto"=>$row["precioProducto"]
            );
        }
        $jsonsring = json_encode($json);
        echo $jsonsring;
    }

?>
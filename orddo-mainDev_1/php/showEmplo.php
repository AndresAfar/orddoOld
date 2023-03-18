<?php

include("connection.php");

$query = "SELECT * FROM employees";
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
    echo $jsonsring;
?>
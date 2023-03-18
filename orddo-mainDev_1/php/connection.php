<?php

$connection = mysqli_connect("localhost", "root", "Andres2003", "orddo_dev");

if ($connection->connect_error){
    die("No hay conexion: ".$connection->connect_error);
    echo "no hay conexion";
}

?>
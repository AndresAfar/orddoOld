<?php

$connection = mysqli_connect("localhost", "root", "", "orddo_dev", "3306");

if ($connection->connect_error){
    die("No hay conexion: ".$connection->connect_error);
}

?>

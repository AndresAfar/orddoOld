<?php

$connection = mysqli_connect("localhost", "root", "Andres 2003", "orddo_dev", "3307");

if ($connection->connect_error){
    die("No hay conexion: ".$connection->connect_error);
}

?>
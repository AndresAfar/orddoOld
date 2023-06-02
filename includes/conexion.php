<?php
    $servidor = "localhost";
    $usuario = "root";
    $password = "Andres2003";
    $db = "orddoproyect";

    $conexion = mysqli_connect($servidor, $usuario, $password, $db);
    if ($conexion->connect_error){
        die("No hay conexion: ".$conexion->connect_error);
        echo "no hay conexion";
    }
    /*<input type="submit" value="Registrarse" name="btnRegistrar">*/
?>
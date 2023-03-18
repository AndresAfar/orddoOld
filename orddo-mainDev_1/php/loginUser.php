<?php

include("connection.php");


if(isset($_POST['username'])){

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];

    $sqlgrabar = "SELECT * FROM users where username = '$consult_username' and password = '$consult_password')";

    $result = mysqli_query($connection, $sqlgrabar);

    if(!$result){
        die ("Hubo un error en la consulta".mysqli_error($connection));
    }
}

?>
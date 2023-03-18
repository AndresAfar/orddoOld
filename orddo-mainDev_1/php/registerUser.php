<?php

include("connection.php");


$options = [
    'cost' => 12,
];



if(isset($_POST['document'])){
    $consult_document = $_POST["document"];
    $consult_name = $_POST["name"];
    $consult_lastName = $_POST["lastName"];
    $consult_phone = $_POST["phone"];
    $consult_email = $_POST["email"];
    $consult_jobPos = $_POST["jobPos"];

    $consult_username = $_POST["username"];
    $consult_password = $_POST["password"];


    $passwordEncrypt = $consult_password;


    $hash = password_hash($passwordEncrypt, PASSWORD_BCRYPT, $options);

    if ($hash === false) {
        die('Error al encriptar la contraseña');
    }


    $query = "INSERT INTO employees (emDocument, emName, emLastName, emPhone, emEmail, emJobPos) VALUES ('$consult_document', '$consult_name', '$consult_lastName', '$consult_phone', '$consult_email', '$consult_jobPos')";
    $sqlgrabar = "INSERT INTO users(username, password) VALUES('$consult_username', '$hash')";
    

    $result = mysqli_query($connection, $query);
    $result2 = mysqli_query($connection, $sqlgrabar);

    if(!$result){
        die ("Hubo un error en la consulta".mysqli_error($connection));
    }

}

?>
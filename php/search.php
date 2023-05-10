<?php
require_once 'connection.php';




if(isset($_GET['enviar'])){
    $search = $_GET['search'];
    $sql = "SELECT * FROM producto WHERE nombreProducto LIKE '$search%'";

    $result= $connection->query($sql);

    $dates = array('date' => array());

    //Cargar datos en tabla y para boton
    if($result -> num_rows>0){
        while($row=$result->fetch_array()){
            $dates['date'][]=array($row[0],$row[1],$row[2],$row[3],$row[4]);
        }
    }

    $connection->close();

    echo json_encode($dates);
}

?>
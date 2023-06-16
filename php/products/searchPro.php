<?php
require_once '../connection.php';




if($_POST){
    $consultSearch = $_POST["nameProduct"];

    $sql = "SELECT * FROM producto WHERE nombreProducto LIKE '$consultSearch%'";

    $result= $connection->query($sql);

    $datas = array('data' => array());

    //Cargar datos de consulta en tabla
    if($result -> num_rows>0){
        while($row=$result->fetch_array()){
            $datas['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[4]);
        }
    }

    $connection->close();

    echo json_encode($datas);
}

?>
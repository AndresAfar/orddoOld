<?php
require_once '../connection.php';

$sql2 = "SELECT * FROM usuario";
$result2= $connection->query($sql2);
$datas = array('data' => array());

if($result2 -> num_rows>0){
    while($row2=$result2->fetch_array()){
        $datas['data'][]=array($row2[0],$row2[1],$row2[2],$row2[3],$row2[4],$row2[5],$row2[6],$row2[7]);
    }
}
echo json_encode($datas);

$connection->close();
?>
<?php
require_once '../connection.php';
header("Content-Type: text/html;charset=utf-8");


$val['success']=array('success' =>false, 'mess'=>"", 'emploid'=>"", 'emploRol'=>"", 'documento'=>"", 'usuario'=>"", 'contrasena'=>"", 'nombre'=>"", 'apellido'=>"", 'telefono'=>"");

if($_POST){

    $idEmplo =$_POST['emploid'];

    $sql = "SELECT * FROM usuario WHERE id_usuario = $idEmplo";
    $result= $connection->query($sql);

    $row=$result->fetch_array();
    $val['success']=true;
    $val['mess']="Se encontro empleado";
    $val['emploid']=$row[0];
    $rol= $row[1];
    $val['documento']=$row[2];
    $val['usuario']=$row[3];
    $val['contrasena']=$row[4];
    $val['nombre']=$row[5];
    $val['apellido']=$row[6];
    $val['telefono']=$row[7];

    $sql2 = "SELECT * FROM rol WHERE id_rol = $rol";
    $result2= $connection->query($sql2);
    $datas = array('data' => array());

    //Cargar datos en tabla y para boton
    $row2=$result2->fetch_array();

    $val['cargo']=$row2[1];

}else{
    $val['success']=false;
    $val['mess']="No se encontro el empleado";
}

$connection->close();
echo json_encode($val);

?>
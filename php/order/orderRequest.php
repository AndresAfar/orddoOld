<?php

require_once '../connection.php';


$val['success']=array('success' =>false, 'mess'=>"");


if($_POST){

    $consult_idProduct = $_POST["idProdutc"];
    $casConsult_idProduct = (int)$consult_idProduct;
    $consult_cantidadPro = $_POST["cantidadProduct"];

    $consult_descri = "blabla";


    //$consult_order = "SELECT id_pedido FROM pedido WHERE id_pedido = $id_carrito";


        $sqlConsultPe = "SELECT * FROM pedido ORDER BY id_pedido DESC";

        $resultCli = $connection->query($sqlConsultPe);

        $row2=$resultCli->fetch_array();
        $idPedido=$row2[0];

        $sql3 = "INSERT INTO detalle_venta(idPedido,idProducto, precioUnitario, cantidad, decripcion) VALUES('$idPedido', '$casConsult_idProduct', 0, '$consult_cantidadPro', '$consult_descri')";
        $resultVen = $connection->query($sql3);

        if($resultVen === true){
            $val['success']=true;
            $val['mess']="Se registro el pedido";
        }
        else{
            $val['success']=false;
            $val['mess']="Error en el registro";
        }
}else{
    $val['success']=false;
    $val['mess']="No se realizo registro";
}
$connection->close();

echo json_encode($val);



?>
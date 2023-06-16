<?php
    require_once '../connection.php';

    $val['success']=array('success' =>false, 'mess'=>"", 'producto'=>"");


    $id = $_POST['id'];

    $sql = "SELECT * FROM detalle_venta WHERE idPedido = '$id'";
    //$query = "SELECT p.id_pedido, p.cli_id_cliente, p.totalPedido, p.fechaPedido, d.idProducto, d.precioUnitario, d.cantidad, d.decripcion FROM pedido p, detalle_venta d WHERE ('$id' = d.idPedido)";
    //$result = mysqli_query($connection, $sql);


    $result = $connection->query($sql);



    if(!$result){
        die ("Hubo un error en la consulta".mysqli_error($connection));
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $producto =$row["idProducto"];

        $sql2 = "SELECT * FROM producto WHERE id_producto = '$producto'";
        $result2 = $connection->query($sql2);
        $row2=$result2->fetch_array();
        $idProduct=$row2[1];

        $json[] = array(
            "idPedido"=>$row["idPedido"],
            "idProducto"=>$row["idProducto"],
            "precioUnitario"=>$row["precioUnitario"],
            "cantidad"=>$row["cantidad"],
            "decripcion"=>$row["decripcion"],
            "nombreProducto"=>$idProduct
        );
    }

    $jsonsring = json_encode($json);
    echo $jsonsring;


?>
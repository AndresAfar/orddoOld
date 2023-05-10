<?php

    session_start();


    if($_POST){
        
    }

    
    if(!isset($_SESSION['pedido'])){
        $producto = array(
            'ID'=>$consult_id,
            'producto'=>$row["nombreProducto"],
            "precio"=>$row["precioProducto"]

        );
        $_SESSION['pedido'][0]=$producto;
    }else{
        $num_products=count($_SESSION['pedido']);
        $producto = array(
            'ID'=>$consult_id,
            'producto'=>$row["nombreProducto"],
            "precio"=>$row["precioProducto"]
        );
        $_SESSION['pedido'][$num_products]=$producto;
    }
    /*
    if(!isset($_SESSION['pedido'])){
        $producto = array(
            'ID'=>$consult_id,

        );
    }*/
    

?>
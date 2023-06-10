CREATE DATABASE orddo_dev;
use orddo_dev;

CREATE TABLE rol(
    id_rol int not null auto_increment,
    nombreRol varchar(45),
    primary key(id_rol),
    unique(id_rol, nombreRol)
)auto_increment=1;

CREATE TABLE usuario(
    id_usuario int not null auto_increment,
    rol_id_rol int not null,
    documento varchar(30) not null,
    usuario varchar(45) not null,
    contrasena varchar(50) not null,
    nombre varchar(45) not null,
    apellido varchar(45) not null,
    telefono varchar(15) not null,
    fechaRegistroUser date not null,
    primary key(id_usuario),
    unique(usuario, documento),
    foreign key(rol_id_rol) references rol(id_rol)
)auto_increment=1;

CREATE TABLE cliente(
    id_cliente int not null auto_increment,
    nombreCliente varchar(45) not null,
    apellidoCliente varchar(45) not null,
    primary key(id_cliente),
    unique(id_cliente)
)auto_increment=1;


CREATE TABLE producto(
    id_producto int not null auto_increment,
    nombreProducto varchar(45) not null,
    descripcionProducto text(150) not null,
    precioProducto double not null,
    estadoProducto varchar(20),
    primary key(id_producto),
    unique(nombreProducto, id_producto)
)auto_increment=1;



CREATE TABLE pedidos_producto(
    pedido_id_pedido2 int not null,
    pro_id_producto2 int not null
);

CREATE TABLE pedido(
    id_pedido int not null auto_increment,
    usu_id_usuario int not null,
    pro_id_producto int not null,
    cli_id_cliente int not null,
    descripcionPedido text(150) not null,
    estadoPedido varchar(20) not null,
    totalPedido double not null,
    fechaPedido date not null,
    primary key(id_pedido),
    unique(id_pedido)
)auto_increment=1;

CREATE TABLE reporte(
    id_reporte int not null auto_increment,
    pedido_id_pedido int not null,
    nombreReporte varchar(45) not null,
    descripcionReporte text(150) not null,
    primary key(id_reporte),
    unique(id_reporte)
)auto_increment=1;


#pedidos
alter table orddo_dev.pedido add foreign key(usu_id_usuario) references usuario(id_usuario);
alter table orddo_dev.pedido add foreign key(pro_id_producto) references pedidos_producto(pro_id_producto2);
alter table orddo_dev.pedido add foreign key(cli_id_cliente) references cliente(id_cliente);



#reporte
alter table orddo_dev.reporte add foreign key(pedido_id_pedido) references pedido(id_pedido);

#pedidos_producto
alter table orddo_dev.pedidos_producto add foreign key(pedido_id_pedido2) references pedido(id_pedido);
alter table orddo_dev.pedidos_producto add foreign key(pro_id_producto2) references producto(id_producto);



INSERT INTO rol values (null, 'Administrador');
INSERT INTO rol values (null, 'Em. General');

INSERT INTO usuario(rol_id_rol, documento, usuario, contrasena, nombre, apellido, telefono) VALUES(1,'123456789','admin123', md5('Admin123_'),'Admin','Des','123445599');

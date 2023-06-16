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
    primary key(id_usuario),
    unique(usuario, documento),
    foreign key(rol_id_rol) references rol(id_rol)
)auto_increment=1;

CREATE TABLE cliente(
    id_cliente int not null auto_increment,
    documentoCliente varchar(45) not null,
    nombreCliente varchar(45) not null,
    primary key(id_cliente),
    unique(id_cliente,documentoCliente)
)auto_increment=1;


CREATE TABLE producto(
    id_producto int not null auto_increment,
    nombreProducto varchar(45) not null,
    descripcionProducto text(150) not null,
    precioProducto double not null,
    estadoProducto varchar(20),
    primary key(id_producto),
    unique(id_producto)
)auto_increment=1;


CREATE TABLE pedido(
    id_pedido int not null auto_increment,
    usu_id_usuario int not null,
    cli_id_cliente int not null,
    totalPedido double not null,
    fechaPedido date not null,
    primary key(id_pedido),
    unique(id_pedido)
)auto_increment=1;

CREATE TABLE detalle_venta(
    idDetalle int not null auto_increment,
    idPedido int not null,
    idProducto int not null,
    precioUnitario double not null,
    cantidad int not null,
    decripcion TEXT(120) not null,
    primary key(idDetalle),
    unique(idDetalle, idPedido)
)auto_increment=1;


#pedidos
alter table pedido add foreign key(usu_id_usuario) references usuario(id_usuario);
alter table pedido add foreign key(cli_id_cliente) references cliente(id_cliente);


#tabla detalle venta
ALTER TABLE detalle_venta ADD foreign key(idProducto) references producto(id_producto);
ALTER TABLE detalle_venta ADD foreign key(idPedido) references pedido(id_pedido);


INSERT INTO rol values (null, 'Administrador');
INSERT INTO rol values (null, 'Em. General');

INSERT INTO usuario(rol_id_rol, documento, usuario, contrasena, nombre, apellido, telefono) VALUES(1,'123456789','admin123', md5('Admin123_'),'Admin','Des','123445599');

user: admin123
pass: Admin12345__

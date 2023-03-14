CREATE DATABASE orddo_dev;
/*use DATABASE orddo_dev;*/


CREATE TABLE users(
    idusers int not null auto_increment,
    username varchar(45) not null,
    password varchar(50) not null,
    rol enum('administrador','empleado') not null,
    primary key(idusers),
    unique(username)
)auto_increment=1;

CREATE TABLE cargo(
    document varchar(25) not null,
    carName varchar(45) not null,
    carLastName varchar(45) not null,
    carPhone varchar(25) not null,
    carDateRegis date not null,
    primary key(document),
    unique(document)
)


CREATE TABLE products(
    idproducts int not null auto_increment,
    proName varchar(45) not null,
    proDescri text(150) not null,
    proPrice double not null,
    primary key(idproducts),
    unique(proName)
)auto_increment=1;



CREATE TABLE order_product(
    order_idorder int not null,
    product_idproduct int not null,
    foreign key(order_idorder) references order(idorder),
    foreign key(product_idproduct) references products(idproducts)
)

CREATE TABLE order(
    idorder int not null auto_increment,
    users_idusers int not null,
    product_idproduct2 int not null,
    nameClien varchar(45) not null,
    lastnameClien varchar(45) not null,
    totalCost double not null,
    orDateRegis date not null,
    primary key(idorder),
    unique(idorder),
    foreign key(users_idusers) references users(idusers),
    foreign key(product_idproduct2) references order_product(product_idproduct)
)auto_increment=1;

CREATE TABLE report(
    idreport int not null auto_increment,
    order_idorder2 int not null,
    nameReport varchar(45) not null,
    reportDescri text(150) not null,
    foreign key(order_idorder2) references order(idorder)
)auto_increment=1;

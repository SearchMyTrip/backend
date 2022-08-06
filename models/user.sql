-- create user table

create table users (
    uid int not null primary key AUTO_INCREMENT,
    username varchar(20) not null unique,
    full_name varchar(100) not null,
    email varchar(100) not null unique,
    phone_number varchar(50) not null unique,
    role varchar(10) not null,
    password varchar(255) not null,
    address varchar(255) not null,
    gender varchar(20) not null
);

-- dummy data
insert into users (username, full_name, email, phone_number, role, password, address) values ('yaman1337', 'Yaman Sarabariya', 'yaman.sarabariya@gmail.com', 9806085429, 'user', 'password', 'Gauriganj,Jhapa');
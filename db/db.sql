CREATE DATABASE prueba_desarrollador;

USE prueba_desarrollador;

-- table user
CREATE TABLE users(
    id INT(11) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(250) NOT NULL,
    token VARCHAR(250) NULL,
    age INT(3) NOT NULL,
    image TEXT NOT NULL,
    description VARCHAR(255) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;
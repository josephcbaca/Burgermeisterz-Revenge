### Schema

CREATE DATABASE burgerdb;
USE burgerdb;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	demolished BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

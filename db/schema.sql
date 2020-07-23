DROP DATABASE burgerdb;
CREATE DATABASE burgerdb;
USE burgerdb;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	demolished BOOLEAN,
	PRIMARY KEY (id)
);


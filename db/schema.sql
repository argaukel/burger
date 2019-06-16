### Schema

CREATE DATABASE ramen_db;
USE ramen_db;

CREATE TABLE ramen
(
	ramen_id int NOT NULL AUTO_INCREMENT,
	ramen_type varchar(255) NOT NULL,
	
	PRIMARY KEY (ramen_id)
);

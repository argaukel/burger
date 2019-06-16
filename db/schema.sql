### Schema

CREATE DATABASE ramen_db;
USE ramen_db;

CREATE TABLE ramen_ingredients
(
	ingredient_id int NOT NULL AUTO_INCREMENT,
	ingredient_name varchar(255) NOT NULL,
	
	PRIMARY KEY (ingredient_id)
);

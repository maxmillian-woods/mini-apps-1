CREATE DATABASE shop;

USE shop;

CREATE TABLE info (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  password VARCHAR(255) NULL,
  shipping VARCHAR(255) NULL,
  phone VARCHAR(255) NULL,
  cc VARCHAR(255) NULL,
  ed VARCHAR(255) NULL,
  cvv VARCHAR(255) NULL,
  billing VARCHAR(255) NULL,
  zip VARCHAR(255) NULL,
  PRIMARY KEY (id)
);
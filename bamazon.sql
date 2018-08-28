CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(75) NULL,
department_name VARCHAR(25) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY(id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("goggles", "sports & outdoors", 25.00, 90);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("boots", "sports & outdoors", 175.00, 70);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("snowboards", "sports & outdoors", 250.00, 40);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("headphones", "electronics", 40.00, 120);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("laptops", "electronics", 10000.00, 80);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("televisions", "electronics", 800.00, 85);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("pc games", "video_games", 50.00, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("playstation", "video_games", 75.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("xbox", "video_games", 75.00, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("swimsuits", "clothing", 25.00, 8);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("dresses", "clothing", 35.00, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("pants", "clothing", 75.00, 35);

SELECT * FROM products;
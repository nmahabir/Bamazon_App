// Require in Node Modules

// Dotenv for sensitive data
require("dotenv").config();

// For mySQL to work
var mysql = require("mysql");

// For user inputs in the command line
var inquirer = require("inquirer");

// Code to print out all available items for sale and initialize SQL

var connection = mysql.createConnection({
  host: process.env.mySQL_host,
  port: process.env.mySQL_port,
  user: process.env.mySQL_user,
  password: process.env.mySQL_password,
  database: process.env.mySQL_database
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
  queryAllItems();
  connection.end();
});

function queryAllItems() {
  connection.query("SELECT * FROM products WHERE stock_quantity <> 0", function(
    err,
    res
  ) {
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
  });
}

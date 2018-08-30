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

// Create connection

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
  //   promptManager();
  //   productsForSale();
  //   lowInventory();
  addProduct();
  //   connection.end();
});

// function to prompt the manager

function promptManager() {
  inquirer
    .prompt({
      name: "menu_option",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "View our products for sale?",
        "View our low inventory?",
        "Add to our inventory?",
        "Add a new product for sale?"
      ]
    })
    .then(function(answers) {
      console.log("Menu Option: " + answers.menu_option);
      switch (answers.menu_option) {
        case "View our products for sale?":
          productsForSale();
          break;
        case "View our low inventory?":
          lowInventory();
          break;
        case "Add to our inventory?":
          addInventory();
          break;
        case "Add a new product for sale?":
          addProduct();
          break;
      }
    });
}

// function to list inventory

function productsForSale() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    // if (err) throw err;
    console.log("Here's our products: ");
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
  });
}
function lowInventory() {
  var query =
    "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {
    console.log("Here's our low Inventory products: ");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product_name + " | " + res[i].stock_quantity);
    }
  });
}
function addInventory() {}
function addProduct() {
  inquirer
    .prompt([
      {
        name: "product_name",
        message: "What's the name of the new product"
      },
      {
        name: "departmet_name",
        message: "What department can this new product be found in?"
      },
      {
        name: "price",
        message: "What's the price of this product?"
      },
      {
        name: "stock_quantity",
        message: "How many of these products do we have to sell?"
      }
    ])
    .then(function(answers) {
      connection.query(
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?"[
          (answers.product_name,
          answers.department_name,
          answers.price,
          answers.stock_quantity)
        ]
        // function(err) {
        //   if (err) throw err;
        //   console.log("New product added!");
        // }
      );
      connection.end();
    });
}

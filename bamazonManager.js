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
  promptManager();
  connection.end();
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

function productsForSale() {}
function lowInventory() {}
function addInventory() {}
function addProduct() {}

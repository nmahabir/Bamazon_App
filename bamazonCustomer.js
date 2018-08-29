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
  queryAllItems();
  // promptCustomer();
  updateStockQuantity(2, 1);
  // // totalPrice(2, 1);
  connection.end();
});

// Function to query all the items that are in stock

function queryAllItems() {
  var query = "SELECT * FROM products WHERE stock_quantity <> 0";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
  });
}

// Function that updates the stock quantity after customer orders

function updateStockQuantity(qty, userId) {
  var query = "UPDATE products SET ? WHERE ?";

  connection.query(
    query,
    [
      {
        stock_quantity: stock_quantity - qty
      },
      {
        id: userId
      }
    ],
    function(err) {
      // console.log(res);
      if (err) throw err;
      console.log("Stock Quantity Updated for ID: " + userId);
    }
  );
}

// functionn that provides the customer with their total price

function totalPrice(qty, userId) {
  var query = "SELECT * FROM products WHERE ?";
  if (qty !== 0) {
    connection.query(
      query,
      {
        id: userId
      },
      function(err, res) {
        // console.log(res);
        // if (err) throw err;
        var userPrice = res[0].price;
        console.log("Your Total is " + userPrice * qty);
      }
    );
  }
  console.log("Please enter a quantity greater than 0");
}

// Constructor function to store the customer's info

// function Order(id, quantity) {
//   this.id = id;
//   this.quantity = quantity;
// }

// var orderArray = [];

function promptCustomer() {
  inquirer
    .prompt([
      {
        name: "id",
        message: "What's the ID of the item you're interested in?"
      },
      {
        name: "quantity",
        message: "How many units of this item would you like?"
      }
    ])
    .then(function(answers) {
      // var newOrder = new Order(answers.id, answers.quantity);
      console.log("New order ID: " + answers.id);
      // console.log(newOrder);
      var query = "SELECT * FROM products WHERE ?";
      // orderArray.push(newOrder);

      connection.query(query, { id: answers.id }, function(err, res) {
        // check error that occurs, and try to figure out how to read the res
        // console.log(res);
        var userStockQuantity = res[0].stock_quantity;
        console.log(userStockQuantity);
        if (userStockQuantity < answers.quantity) {
          console.log(
            "Oh no! We don't have enough in stock! Try a lower quantity or come back when we restock!"
          );
        }
        updateStockQuantity(answers.quantity, answers.id);
        totalPrice(answers.quantity, answers.id);
      });
    });
}

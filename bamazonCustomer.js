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
  //   updateStockQuantity(2, 1);
  //   totalPrice(2, 1);
  promptCustomer();
  connection.end();
});

function queryAllItems() {
  connection.query("SELECT * FROM products WHERE stock_quantity <> 0", function(
    err,
    res
  ) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id + " | " + res[i].product_name + " | " + res[i].price
      );
    }
  });
}

function updateStockQuantity(qty, userId) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: stock_quantity - qty
      },
      {
        id: userId
      }
    ],
    function(err, res) {
      console.log(res);
      if (err) throw err;
      console.log("Stock Quantity Updated for " + res[0].product_name);
    }
  );
}

function totalPrice(qty, userId) {
  if (qty !== 0) {
    connection.query(
      "SELECT * FROM products WHERE ?",
      {
        id: userId
      },
      function(err, res) {
        console.log(res);
        if (err) throw err;
        var price = res[0].price;
        console.log("Your Total is " + price * qty);
      }
    );
  }
  console.log("Please enter a quantity greater than 0");
}

// Constructor function to store the customer's info
function Order(id, quantity) {
  this.id = id;
  this.quantity = quantity;
}

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
      var newOrder = new Order(answers.id, answers.quantity);
      console.log("New order: " + newOrder.id);
      //   orderArray.push(newOrder);

      connection.query(
        "SELECT * FROM products WHERE ?",
        { id: newOrder.id },
        function(err, res) {
          console.log(res);
          if (!(res[0].stock_quantity > newOrder.quantity)) {
            console.log(
              "Oh no! We don't have enough in stock! Try a lower quantity or come back when we restock!"
            );
          }
          updateStockQuantity(newOrder.quantity, newOrder.id);
          totalPrice(newOrder.quantity, newOrder.id);
        }
      );
    });
}

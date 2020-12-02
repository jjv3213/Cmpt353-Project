"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  database: 'coffeeshop',
  password: '1234'
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB Connected...');
  }
})

app.post("/orders", (req, res) => {
  var { customer, data } = req.body;
  var datetime = new Date();
  var customerOrder = { customer: customer, data: data, is_ready: 'false', timestamp: datetime };

  var sql = "INSERT INTO orders SET ?";
  db.query(sql, customerOrder, (err, result) => {
    if (err) throw err;
    getAllOrders(res);
  })
});

app.post("/menu", (req, res) => {
  var { item, price } = req.body;
  var menuItem = { item: item, price: price };

  var sql = "INSERT INTO menu SET ?";
  db.query(sql, menuItem, (err, result) => {
    if (err) throw err;
    getMenu(res);
  })
});

app.get("/orders", (req, res) => {
    getAllOrders(res);
})

app.get("/menu", (req, res) => {
    getMenu(res);
})

app.patch("/orders", (req, res) => {
  var name = req.body.name;
  var sql = `UPDATE orders SET is_ready=true WHERE customer='${name}';`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    getAllOrders(res);
  })
})

app.delete("/orders", (req, res) => {
  var name = req.body.name;
  var sql = `DELETE FROM orders WHERE customer='${name}';`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    getAllOrders(res);
  })
})

app.delete("/menu", (req, res) => {
  var item = req.body.item;
  var sql = `DELETE FROM menu WHERE item='${item}';`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    getMenu(res);
  })
})

function getAllOrders(res) {
  var sql = 'SELECT * FROM orders';

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  })
}

function getMenu(res) {
  var sql = `SELECT * FROM menu;`;

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  })
}

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

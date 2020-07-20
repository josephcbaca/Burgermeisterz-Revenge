// Set up MySQL connection.
let mysql = require("mysql");
require('dotenv').config({ path: "/Users/josep/dev/AdditionalFiles/.env" });

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "burgerdb"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;

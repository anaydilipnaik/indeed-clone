const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 100,
  host: "indeed-mysql-db.cz3xhefv1lvq.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "indeedgroup2",
  database: "indeed",
});

module.exports = db;

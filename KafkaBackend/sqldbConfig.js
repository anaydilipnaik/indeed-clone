var mysql = require("mysql");

var con = mysql.createConnection({
  host: "indeed-mysql-db.cz3xhefv1lvq.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "indeedgroup2",
  database: "indeed",
});

try {
  con.connect(function (err) {
    // if (err) throw err;
    if (err) {
      console.log("Error while connecting to database", err);
    } else {
      console.log("MySQL Connected!");
    }
  });
} catch (error) {
  console.log("Error while connecting to mySQL");
}

module.exports = con;

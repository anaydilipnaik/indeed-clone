const QueryBuilder = require("node-querybuilder");

const settings = {
  host: "indeed-mysql-db.cz3xhefv1lvq.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "indeedgroup2",
  database: "indeed",
};

const pool = new QueryBuilder(settings, "mysql", "pool");

module.exports = pool;

const mysql = require("mysql");

// create here mysql connection

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blogsqldb",
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Connection has been established successfully!");
});

module.exports = dbConn;

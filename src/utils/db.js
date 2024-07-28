const mysql = require("mysql2");
const { db } = require("./environment");

const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
});

const connectMysqlDb = () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
  });
};

module.exports = {
  connectMysqlDb,
  connection,
};

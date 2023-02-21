import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "edahzbxx_aduseretemple",
  password: "3NdK]kb@I6!f",
  database: "edahzbxx_etempledb",
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

export default connection;

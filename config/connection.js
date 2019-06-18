// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "ramen_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// app.get("/", function(req, res) {
//   connection.query("SELECT * FROM ramen_ingredients;", function(err, data) {
//     if (err) {
//       return res.status(500).end();
//     }

//     res.render("index", { ramen_ingredients: data });
//   });
// });


// Export connection for our ORM to use.
module.exports = connection;
var express = require("express");
var connection = require("./config/connection.js");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/ramenController.js");

// app.use(routes);
//consloe log table data
app.get("/", function (req, res) {
  connection.query("SELECT * FROM ramen_ingredients;", function (err, data) {
    console.log(data)
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { ramen_ingredients: data });
  });
});

app.post("/api/ramen_ingredients", function (req, res) {
  var query = connection.query("INSERT INTO ramen_ingredients (ingredient_name) VALUES (?)", [req.body.ingredient_name],
    function (err, result) {
      console.log("eek")
      console.log(query.sql)
      console.log(req.body);
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();

      }

      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
var express = require("express");

var router = express.Router();

// Import the model (ramen.js) to use its database functions.
var ramen = require("../models/ramen.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  ramen.all(function(data) {
    var hbsObject = {
      ramen: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/ramen", function(req, res) {
  ramen.create([
    "ramen_type", "shio"
  ], [
    req.body.ramen_type,
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/ramens/:id", function(req, res) {
  var condition = "ramen_id = " + req.params.id;

  console.log("condition", condition);

  ramen.update({
    // sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/ramens/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  ramen.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;

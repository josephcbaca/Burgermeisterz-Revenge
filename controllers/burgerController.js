let express = require("express");

let router = express.Router();

// Import the model (burger.js) to use its database functions.
let burger = require("../models/burger.js");

// Renders handlebars
router.get("/", function (req, res) {
  burger.all(function (data) {
    let hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// Read all burgers
router.get("/api/burgers", function (req, res) {
  burger.all(function (data) {
    let hbsObject = {
      burgers: data
    };
    res.json(hbsObject);
  });
});

// Read burger by id
router.get("/api/burgers/:id", function (req, res) {
  burger.all(function (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === parseInt(req.params.id)) {
        res.json(data[i]);
      };
    };
  });
});

router.post("/api/burgers", function (req, res) {
  burger.create([
    "name", "demolished"
  ], [
    req.body.name, req.body.demolished
  ], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/demolished/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    demolished: req.body.demolished
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    console.log(result)
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

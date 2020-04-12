const express = require("express");

const catProfileController = require("../controllers/catProfileController.js");

const app = express();

app.get("/cat/:name", catProfileController.getCatProfile);



module.exports = app;
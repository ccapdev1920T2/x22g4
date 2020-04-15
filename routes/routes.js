const express = require("express");

const catProfileController = require("../controllers/catProfileController.js");
const adoptCatController = require("../controllers/adoptCatController.js");

const app = express();

app.get("/cat/:name", catProfileController.getCatProfile);
app.get("/adoptCat", adoptCatController.getCatCards);



module.exports = app;
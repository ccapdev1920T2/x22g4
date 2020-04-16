const express = require("express");

const catProfileController = require("../controllers/catProfileController.js");
const adoptCatController = require("../controllers/adoptCatController.js");

const app = express();

app.get("/cat/:name", catProfileController.getCatProfile);
app.get("/adoptCat", adoptCatController.getCatCards);

//Home Route
app.get('/', function(req, res){
    res.render('index', {
        title: 'Home',
        home_active: true,
    })  
});

app.get('/home(page)?(.html)?', function(req, res) {
    res.render('index', {
        title: 'Home',
        home_active: true,
    })
});

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        title: 'Donate',
        donate_active: true,
    })  
});
//Donate-Feed

module.exports = app;
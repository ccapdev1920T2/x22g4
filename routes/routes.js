const express = require("express");
const Sequelize = require('sequelize');

const catProfileController = require("../controllers/catProfileController.js");
const adoptCatController = require("../controllers/adoptCatController.js");

const signupController = require("../controllers/signupController.js");
const loginController = require("../controllers/loginController.js");

const userProfileController = require("../controllers/userProfileController.js");
const app = express();

app.get("/cat/:name", catProfileController.getCatProfile);

app.get("/adoptCat", adoptCatController.getCatCards);

//Home Route
app.get('/', function(req, res){

    if(req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }

    console.log(req.session.viewCount);

    res.render('index', {
        title: 'Home | Catvas',
        home_active: true,
    })  
});

app.get('/home(page)?(.html)?', function(req, res) {
    res.render('index', {
        title: 'Home | Catvas',
        home_active: true,
    })
});

// Meet the Team Route
app.get('/team', function(req, res){
    res.render('team', {
        title: 'Meet the Team | Catvas',
        team_active: true,
    })  
});

//FAQ Route
app.get('/faq', function(req, res){
    res.render('faq', {
        title: 'FAQ | Catvas',
        faq_active: true,
    })  
});

//Signup Route
app.get('/signup', signupController.getSignup);
app.post('/signup', signupController.postSignup);

//Login Route
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);

//Checkusername
app.get('/getCheckUsername', signupController.getCheckUsername);

app.get('/profile/:username', userProfileController.getUserProfile);

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        donate_active: true
    })  
});


module.exports = app;
//Express-Session
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);   
const database = require('../models/database.js');

//Cookie & Morgan & Sequelize & Body Parser
const cookieParser = require('cookie-parser');
//const morgan = require('morgan');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');


const catProfileController = require("../controllers/catProfileController.js");
const adoptCatController = require("../controllers/adoptCatController.js");

const signupController = require("../controllers/signupController.js");
const loginController = require("../controllers/loginController.js");

const userProfileController = require("../controllers/userProfileController.js");
const app = express();

//Home Route
//Init Session
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    key: 'user_sid', //user session id
    secret: 'arthaland',
    resave: false,
    saveUninitialized: true,
    store: database.sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 Day.
    }
}));



app.use((req, res, next) => {
    if(req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.get('/', function(req, res) {
    res.render('index', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user
    })
});
//Session

//Cats
app.get("/cat/:name", catProfileController.getCatProfile);
app.get("/adoptCat", adoptCatController.getCatCards);
//Cats

app.get('/home(page)?(.html)?', function(req, res) {
    res.render('index', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user,
        title: 'Home | Catvas',
        home_active: true,
    })
});


// Meet the Team Route
app.get('/team', function(req, res){
    res.render('team', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user,
        title: 'Meet the Team | Catvas',
        team_active: true,
    })  
});

//FAQ Route
app.get('/faq', function(req, res){
    res.render('faq', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user,
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

app.get('/logout', function(req, res) {
    req.logout;
    req.session.destroy(function(err) { });
    res.redirect('/');
})

//Checkusername
app.get('/getCheckUsername', signupController.getCheckUsername);

app.get('/profile/:username', userProfileController.getUserProfile);

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user,
        donate_active: true,
    })  
});


module.exports = app;
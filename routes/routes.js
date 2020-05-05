//Express-Session
const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);   
const database = require('../models/database.js');

//Cookie and Body
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const catProfileController = require("../controllers/catProfileController.js");
const adoptCatController = require("../controllers/adoptCatController.js");

const signupController = require("../controllers/signupController.js");
const loginController = require("../controllers/loginController.js");

const userProfileController = require("../controllers/userProfileController.js");

const catFeedController = require("../controllers/catFeedController.js");
const postController = require("../controllers/postController.js");

const signupValidator = require("../validators/signupValidator.js");

//Multer image processing
var multer = require('multer');
var storage = multer.diskStorage({
    destination:  './public/postImgs',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),
upload = multer({ storage: storage }).single('file');

var avatarStorage = multer.diskStorage({
    destination:  './public/avatars',
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
}),
avatarUpload = multer({ storage: avatarStorage }).single('edit-avatar-file');

const app = express();

//Init Cookie and Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Init Sessions
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

//Home Route
app.get('/', function(req, res) {
    res.render('index', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user
    })
});
//Sessions

//Cats
app.get("/cat/:name", catProfileController.getCatProfile);
app.get("/adoptCat", adoptCatController.getCatCards);
//Cats

//Home Route

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



//Login Route
app.get('/login', loginController.getLogin);
app.post('/login', loginController.postLogin);
//Logout Route
app.get('/logout', function(req, res) {
    req.logout;
    req.session.destroy(function(err) { });
    res.redirect('/');
})

//Signup Route
app.get('/signup', signupController.getSignup);
app.post('/signup', signupValidator.signupValidation(), signupController.postSignup);

app.get('/getCheckUsername', signupController.getCheckUsername);

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        active_session: (req.session.user && req.cookies.user_sid),
        active_user: req.session.user,
        donate_active: true,
    })  
})

app.get('/profile/:username', userProfileController.getUserProfile);
app.put('/profile/:username', avatarUpload, userProfileController.submitAvatar);
app.get('/editProfileDescription', userProfileController.editProfileDescription);
app.put('/submitEditProfileDescription', userProfileController.submitEditProfileDescription);


app.get('/catFeed/top', catFeedController.getCatFeedTop);
app.get('/catFeed', catFeedController.getCatFeedRecent);
app.post('/catFeed', upload, catFeedController.postCatFeed);

app.get('/post/:_id', postController.getPost);
app.get('/addComment', postController.addComment);
app.put('/deleteComment', postController.deleteComment);
app.get('/openEdit', postController.openEdit);
app.put('/saveEdit', postController.saveEdit);
app.get('/likePost', postController.likePost);
app.get('/unlikePost', postController.unlikePost);
app.put('/deletePost', postController.deletePost);

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        donate_active: true
    })  
});

module.exports = app;
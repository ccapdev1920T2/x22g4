const express = require("express");

const catProfileController = require("../controllers/catProfileController.js");
const adoptCatController = require("../controllers/adoptCatController.js");
const signupController = require("../controllers/signupController.js");
const userProfileController = require("../controllers/userProfileController.js");
const catFeedController = require("../controllers/catFeedController.js");
const postController = require("../controllers/postController.js");
const loginController = require("../controllers/loginController.js");

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

app.get("/cat/:name", catProfileController.getCatProfile);

app.get("/adoptCat", adoptCatController.getCatCards);

//Home Route
app.get('/', function(req, res){
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

app.get('/editdesc', function(req, res){
    res.render('edit-desc', {
        title: 'Edit | Catvas',
    })  
});

app.get('/login', loginController.getLogin);

app.get('/signup', signupController.getSignup);
app.post('/signup', signupController.postSignup);

app.get('/getCheckUsername', signupController.getCheckUsername);

app.get('/profile/:username', userProfileController.getUserProfile);
app.put('/profile/:username', avatarUpload, userProfileController.submitAvatar);
app.get('/editProfileDescription', userProfileController.editProfileDescription);
app.put('/submitEditProfileDescription', userProfileController.submitEditProfileDescription);


app.get('/catFeed/top', catFeedController.getCatFeedTop);
app.get('/catFeed', catFeedController.getCatFeedRecent);
app.post('/catFeed', upload, catFeedController.postCatFeed);

app.get('/post/:_id', postController.getPost);
app.put('/addComment', postController.addComment);
app.put('/deleteComment', postController.deleteComment);
app.get('/openEdit', postController.openEdit);
app.put('/saveEdit', postController.saveEdit);
app.put('/likePost', postController.likePost);
app.put('/unlikePost', postController.unlikePost);
app.put('/deletePost', postController.deletePost);

//Donate-Feed
app.get('/donate', function(req, res){
    res.render('donate', {
        donate_active: true
    })  
});


module.exports = app;
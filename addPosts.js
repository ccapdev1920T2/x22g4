const database = require('./models/database.js');
const Post = require('./models/post.js');
const User = require('./models/user.js');
const Comment = require('./models/comment.js');
const helper = require('./controllers/helper.js');
const mongoose = require('mongoose');

database.connect();
database.deleteMany(Post, (flag) => {})
database.deleteMany(User, (flag) => {})

var user2 = new User({
    username: 'hello2',
    password: 'Password1',
    description: 'test'
});

database.insertOne(User, user2, function (param) {  });

var post2 = new Post({
    author: user2.username,
    title: 'test',
    caption: 'What the fuck did you just fucking say about me, you little bitch? Ill have you know I graduated top of my class in the Navy Seals, and Ive been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and Im the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet?',
    numberOfMeowts: '70',
    numberOfComments: '3' 
});

database.insertOne(Post, post2, function(param) {
});

var comment2 = new Comment({
    author: user2.username, 
    text: 'test comment'
});



helper.insertComment(post2, comment2, user2);




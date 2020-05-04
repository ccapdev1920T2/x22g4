const database = require('./models/database.js');
const Post = require('./models/post.js');
const User = require('./models/user.js')
const Comment = require('./models/comment.js')
const fs = require('fs')
database.connect();


database.findOne(User, {username: 'tester'}, {}, (data) => {
    console.log(data);
})
//database.updateOne(Post, {_id: '5ea4392d8c4d733014dab255'}, {
//    $inc: {numberOfMeowts: 5}
//});

//database.updateMany(User, {}, {posts: []}) 

/*database.findMany(User, {}, {}, (result) => {
    console.log(result)
})

database.findMany(Comment, {}, {}, (result) => {
    console.log(result)
})

database.findMany(Post, {}, {}, (result) => {
    console.log(result)
})*/
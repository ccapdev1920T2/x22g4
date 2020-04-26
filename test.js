const database = require('./models/database.js');
const Post = require('./models/post.js');
const User = require('./models/user.js')
database.connect();

//database.updateOne(Post, {_id: '5ea4392d8c4d733014dab255'}, {
//    $inc: {numberOfMeowts: 5}
//});

//database.updateMany(User, {}, {posts: []}) 
database.findMany(User, {}, {}, (result) => {
    console.log(result)
})
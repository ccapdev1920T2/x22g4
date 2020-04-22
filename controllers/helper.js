const database = require('../models/database.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');


const helper = {

    insertComment: function(post, comment, user) {
        database.insertOne(Comment, comment, function(insertedComment){
            
            // update post and append comment
            database.updateOne(Post, {_id: post._id}, {
                 $push: {comments: insertedComment._id},
                 $inc: {numberOfComments: 1},
                 latestComment: insertedComment.text,
                 latestCommentAuthor: insertedComment.author
                });

            database.findMany(Post, {}, {}, (result) => {
                console.log(result);
            });
        });
    },

    newPost(post) {
        var author = post.author;

        database.insertOne(Post, post, (postResult) => {
            database.updateOne(User, {username: author}, {
                $push: {posts: postResult._id}
            }); 
        })


    }

}

module.exports = helper;
    




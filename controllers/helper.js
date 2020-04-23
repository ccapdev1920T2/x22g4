const database = require('../models/database.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');


const helper = {

    insertComment: function(postId, comment) {
        database.insertOne(Comment, comment, function(insertedComment){
            
            // update post and append comment
            database.updateOne(Post, {_id: postId}, {
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

    newPost: function(post) {
        var author = post.author;

        database.insertOne(Post, post, (postResult) => {
            database.updateOne(User, {username: author}, {
                $push: {posts: postResult._id}
            }); 
        })
    },

    formatDate: function(date) {
        var delta = Math.round((+new Date - date) / 1000);
    
        var minute = 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
    
        var fuzzy;
    
        if (delta < 30) {
            fuzzy = 'just then';
        } else if (delta < minute) {
            fuzzy = delta + ' seconds ago';
        } else if (delta < 2 * minute) {
            fuzzy = 'a minute ago.'
        } else if (delta < hour) {
            fuzzy = Math.floor(delta / minute) + ' minutes ago';
        } else if (Math.floor(delta / hour) == 1) {
            fuzzy = '1 hour ago.'
        } else if (delta < day) {
            fuzzy = Math.floor(delta / hour) + ' hours ago';
        } else if (delta < day * 2) {
            fuzzy = 'yesterday';
        }
    
        return fuzzy;
    }

}

module.exports = helper;
    




const database = require('../models/database.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const fs = require('fs');


const helper = {

    updateAvatar: function(username, avatar) {
        database.updateOne(User, {username: username}, {avatar: avatar});
    },

    renameImage: function(req, newName) {
        var originalName = req.file.originalname;
        var extension = originalName.substring(originalName.lastIndexOf("."));
        const newUrl = req.file.destination + '/' + newName + extension; 
        
        fs.renameSync(req.file.path, newUrl);
        return newName + extension;
    },

    updateDescription: function (username, description) {
        database.updateOne(User, {username: username}, {description: description});
      },

    insertComment: function(postId, comment) {
        database.insertOne(Comment, comment, function(insertedComment){
            console.log("ID:" + postId);
            
            // update post and append comment
            database.updateOne(Post, {_id: postId}, {
                 $push: {comments: insertedComment._id},
                 $inc: {numberOfComments: 1},
                 latestComment: insertedComment.text,
                 latestCommentAuthor: insertedComment.author
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

    updatePost: function(postId, newTitle, newCaption) {
        let date = Date.now();
        
        database.updateOne(Post, {_id: postId}, {postTitle: newTitle, caption: newCaption, date: date}, (flag) => {
        
        })
    },

    likePost: function(postId, username) {
        database.updateOne(Post, {_id: postId}, {$inc: {numberOfMeowts: 1}}, (flag) => {
            
        })
        database.updateOne(User, {username: username}, {$addToSet: {meowtedPosts: postId}}, (userFlag) => {
            console.log(userFlag)
        })
    },

    unlikePost: function(postId, username) {
        database.updateOne(Post, {_id: postId}, {$inc: {numberOfMeowts: -1}}, (flag) => {
            
        })
        database.updateOne(User, {username: username}, {$pull: {meowtedPosts: postId}}, (userFlag) => {
            console.log(userFlag)
        })
    },

    deletePost: function(postId, username) {
        database.findOne(Post, {_id: postId}, 'imageUrl', (postResult) => {
            fs.unlink('./public/postImgs/' + postResult.imageUrl, (callback) => {});

            database.deleteOne(Post, {_id: postId});
        })
        
        
        database.deleteMany(Comment, {parentPostId: postId});

        database.updateOne(User, {username: username}, {$pull: {posts: postId, meowtedPosts: postId}}, (flag) =>{});

        database.updateMany(User, {}, {$pull: {meowtedPosts: postId}}, (flag) => {});

    },

    


    getFeaturedPost: function() {
        Post.findOne(/*{date: {'$lte':new Date(),'$gte':new Date(Date()-7)}}*/)
        .sort('-numberOfMeowts')
        .lean()
        .exec((err, results) => {
            
            if (results == null) {
                return;
            }
            if (results.numberOfMeowts == 0) {
                return;
            }

            let featuredPost = {
                _id: results._id,
                postTitle: results.postTitle,
                caption: results.caption,
                imageUrl: results.imageUrl,
                author: results.author
            }

    
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
    




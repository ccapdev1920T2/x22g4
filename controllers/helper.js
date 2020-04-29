const database = require('../models/database.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const fs = require('fs');


const helper = {

    updateAvatar: function(username, avatar) {
        let extension = avatar.substring(avatar.lastIndexOf("."));
        let filename = avatar.split('.').slice(0, -1).join('.');
        switch (extension) {
            case '.jpg':
                fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                break;
            case '.png': 
                fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                fs.unlink('./public/avatars/' + filename + '.jpeg', (fds) => {});
                break;
            case '.jpeg':
                fs.unlink('./public/avatars/' + filename + '.png', (fds) => {});
                fs.unlink('./public/avatars/' + filename + '.jpg', (fds) => {});
                break;
        }
        
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

    insertComment: function(postId, comment, res) {
        database.insertOne(Comment, comment, function(insertedComment){
            console.log("ID:" + postId);
            
            Post.updateOne({_id: postId}, {
                $push: {comments: insertedComment._id},
                $inc: {numberOfComments: 1},
                latestComment: insertedComment.text,
                latestCommentAuthor: insertedComment.author
               })
               .then((a) => {
                res.render('partials/commentItem.hbs', comment);
               }) 
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

    updatePost: function(postId, newTitle, newCaption, res) {
        let date = Date.now();

        Post.updateOne({_id: postId}, {postTitle: newTitle, caption: newCaption, date: date})
        .then((a) => {
            res.send(true);
        })
    },

    likePost: function(postId, username, res) {
        Post.updateOne({_id: postId}, {$inc: {numberOfMeowts: 1}})
        .then((a) => {
            User.updateOne({username: username}, {$addToSet: {meowtedPosts: postId}})
            .then((b) => {
                res.send(true);
            })
        })  
    },

    unlikePost: function(postId, username, res) {
        Post.updateOne({ _id: postId }, { $inc: { numberOfMeowts: -1 } })
        .then((a) => {
            User.updateOne({ username: username }, { $pull: { meowtedPosts: postId } })
                .then((b) => {
                    res.send(true);
                });
        });
    },

    deletePost: function(postId, username, res) {
        Post.findOne({_id: postId}, 'imageUrl')
        .exec((err, postResult) => {
            fs.unlink('./public/postImgs/' + postResult.imageUrl, (callback) => {});

            Post.deleteOne({_id: postId})
            .then((a) => {
                res.send(true);
            })
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
    




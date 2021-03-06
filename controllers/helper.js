const database = require('../models/database.js');
const Post = require('../models/post.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const sanitize = require('mongo-sanitize');
const fs = require('fs');


const helper = {

    sanitize: function (query) {
        return sanitize(query);
      },

    updateAvatar: function(username, avatar, res) {
        let extension = avatar.substring(avatar.lastIndexOf("."));
        let filename = avatar.split('.').slice(0, -1).join('.');
        User.updateOne({username: username}, {avatar: avatar})
        .then((a) => {
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

            res.redirect('/profile/' + username);
        })
    },

    renameImage: function(req, newName) {
        var originalName = req.file.originalname;
        var extension = originalName.substring(originalName.lastIndexOf("."));
        const newUrl = req.file.destination + '/' + newName + extension; 
        
        fs.renameSync(req.file.path, newUrl);
        return newName + extension;
    },

    updateDescription: function (username, description, res, submitEditProfileDescriptionJs) {
        User.updateOne({username: username}, {description: description})
        .then((a) => {
            if (submitEditProfileDescriptionJs) {
                res.send(true);
            } else {
                res.redirect('/profile/' + username);
            }
        })
      },

    insertComment: function(postId, comment, req, res, js) {
        database.insertOne(Comment, comment, function(insertedComment){
            console.log("ID:" + postId);
            
            Post.updateOne({_id: postId}, {
                $push: {comments: insertedComment._id},
                $inc: {numberOfComments: 1},
                latestComment: insertedComment.text,
                latestCommentAuthor: insertedComment.author
               })
               .then((a) => {
                let details = {
                    _id: comment._id,
                    author: comment.author,
                    text: comment.text, 
                    userOwnsComment: true,

                    //Session
                    active_session: (req.session.user && req.cookies.user_sid), 
                    active_user: req.session.user,
                    current_user: (req.session.user == req.params.username),
                    //Session

                };
                if (js) {
                    res.render('partials/commentItem.hbs', details);
                } else {
                    res.redirect('/post/' + postId);
                }
                
               }) 
        });
    },

    editComment: function(commentId, postId, text, req, res, js) {
        Comment.updateOne({_id: commentId}, {text: text})
        .then((result) => {
            Post.findOne({_id: postId})
            .populate('comments')
            .exec((err, postResult) => {
                let latestComment = '';
                let latestCommentAuthor = '';

                if (postResult.comments !== undefined && postResult.comments.length > 0) {
                    latestComment = postResult.comments[postResult.comments.length - 1].text;
                    latestCommentAuthor = postResult.comments[postResult.comments.length - 1].author;
                }
                
                Post.updateOne({_id: postId}, {latestComment: latestComment, latestCommentAuthor: latestCommentAuthor})
                .then((data) => {

                    if (js) {
                        let details = {
                            //Session
                            active_session: (req.session.user && req.cookies.user_sid), 
                            active_user: req.session.user,
                            current_user: (req.session.user == req.params.username),
                            //Session
        
                            _id: commentId,
                            text: text,
                        }
        
                        res.render('partials/editCommentButton.hbs', details);
                    } else {
                        res.redirect('/post/' + postId);
                    }

                })
            })  
        })
    },

    deleteComment: function(commentId, postId, res, js) {
        Comment.deleteOne({_id: commentId})
        .then((data) => {
            Post.updateOne({_id: postId}, {$inc: {numberOfComments: -1}, $pull: {comments: commentId}})
            .then((data) => {
                Post.findOne({_id: postId})
                .populate('comments')
                .exec((err, postResult) => {
                    let latestComment = '';
                    let latestCommentAuthor = '';

                    if (postResult.comments !== undefined && postResult.comments.length > 0) {
                        latestComment = postResult.comments[postResult.comments.length - 1].text;
                        latestCommentAuthor = postResult.comments[postResult.comments.length - 1].author;
                    }
                    
                    Post.updateOne({_id: postId}, {latestComment: latestComment, latestCommentAuthor: latestCommentAuthor})
                    .then((data) => {
                        if (js) {
                            res.send(true);
                        } else {
                            res.redirect('/post/' + postId);
                        }
                        
                    })
                })
            })
        })
    },

    newPost: function(post, res) {
        var author = post.author;

        database.insertOne(Post, post, (postResult) => {
            User.updateOne({username: author}, {
                $push: {posts: postResult._id}
            })
            .then((a) => {
                res.redirect('/post/' + post._id);
            })
        })
    },

    updatePost: function(postId, newTitle, newCaption, res, saveEditJs) {
        let date = Date.now();

        Post.updateOne({_id: postId}, {postTitle: newTitle, caption: newCaption, date: date})
        .then((a) => {
            if (saveEditJs) {
                res.send(true);
            } else {
                res.redirect('/post/' + postId);
            }
            
        })
    },

    likePost: function(postId, username, res, js) {
        Post.updateOne({_id: postId}, {$inc: {numberOfMeowts: 1}})
        .then((a) => {
            User.updateOne({username: username}, {$addToSet: {meowtedPosts: postId}})
            .then((b) => {
                if (js) {
                    res.send(true);
                } else {
                    res.redirect('/post/' + postId);
                }
                
            })
        })  
    },

    unlikePost: function(postId, username, res, js) {
        Post.updateOne({ _id: postId }, { $inc: { numberOfMeowts: -1 } })
        .then((a) => {
            User.updateOne({ username: username }, { $pull: { meowtedPosts: postId } })
                .then((b) => {
                    if (js) {
                        res.send(true);
                    } else {
                        res.redirect('/post/' + postId);
                    }
                });
        });
    },

    deletePost: function(postId, username, res, js) {
        Post.findOne({_id: postId}, 'imageUrl')
        .exec((err, postResult) => {
            fs.unlink('./public/postImgs/' + postResult.imageUrl, (callback) => {
                Post.deleteOne({_id: postId})
                .then((a) => {
                    if (js) {
                        res.redirect(true);
                    } else  {
                        res.redirect('/catFeed');
                    }
                    
                })
            });

           
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
    




const database =  require('../models/database.js');
const helper = require('./helper.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js')
const User = require('../models/user.js');

const postController = {
    
    getPost: function(req, res) {
        var query = {_id: req.params._id};

        Post.findOne(query)
        .populate('comments')
        .lean()
        .exec((err, result) => {
            if(result == null) {
                console.log('no post returned');
                res.render('404');
                return;
            }

            //find if user owns post
            database.findOne(User, {username: req.session.user}, 'posts meowtedPosts', (userResult) => {

                let userOwnsPost = false;

                /*
                if(req.session.user == username) {
                    var userOwnsPost = true;
                } else {
                    var userOwnsPost = false;
                }
                */

                let userLiked = false;

                if (userResult != null) {
                    userOwnsPost = userResult.posts.includes(result._id);
                    userLiked = userResult.meowtedPosts.includes(result._id);
                };
                
                result.date = helper.formatDate(result.date)

                var details = {

                    //Session
                    active_session: (req.session.user && req.cookies.user_sid), 
                    active_user: req.session.user,
                    current_user: (req.session.user == req.params.username),
                    //Session

                    _id: result._id,
                    postTitle: result.postTitle,
                    caption: result.caption,
                    imageUrl: result.imageUrl,
                    date: result.date,
                    numberOfMeowts: result.numberOfMeowts,
                    author: result.author,
                    comments: result.comments,
                    userOwnsPost: userOwnsPost,
                    userLiked: userLiked
                }

                res.render('post', details)
            })

            
        });
    },

    addComment: function(req, res) {
        //TODO: session username
        let author = req.session.user;
        let text = req.body.text;
        let postId = req.body.postId;

        let newComment = new Comment({
            parentPostId: postId,
            author: author,
            text: text
        });

        helper.insertComment(postId, newComment, res);
    },

    openEdit: function(req, res) {
        let details = {
            postTitle: req.query.postTitle,
            caption: req.query.caption
        };

        res.render('partials/editPost.hbs', details)
    },

    saveEdit: function(req, res) {
        helper.updatePost(req.body.postId, req.body.postTitle, req.body.caption, res);
    },

    likePost: function(req, res) {
        let username = req.session.user;
        let postId = req.body.postId;

        helper.likePost(postId, username, res);
    },

    unlikePost: function(req, res) {
        let username = req.session.user;
        let postId = req.body.postId;

        helper.unlikePost(postId, username, res);
    },

    deletePost: function(req, res) {
        let username = req.session.user;
        let postId = req.body.postId; 

        helper.deletePost(postId, username, res);
      
    }
}

module.exports = postController;



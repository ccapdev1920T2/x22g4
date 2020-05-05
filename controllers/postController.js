const database =  require('../models/database.js');
const helper = require('./helper.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js')
const User = require('../models/user.js');

const postController = {
    
    getPost: function(req, res) {
        if(!(req.session.user && req.cookies.user_sid)) {
            res.redirect('/login');
            return;
        }
        let _id = helper.sanitize(req.params._id);

        Post.findOne({_id: _id})
        .populate('comments')
        .lean()
        .exec((err, result) => {
            if(result == null) {
                console.log('no post returned');
                res.render('404');
                return;
            }

            //find if user owns post
            let username = req.session.user;
            database.findOne(User, {username: username}, 'posts meowtedPosts', (userResult) => {

                let userOwnsPost = false;
                let userLiked = false;
                let comments = new Array();
        
                if (userResult != null) {
                    userOwnsPost = userResult.posts.includes(result._id);
                    userLiked = userResult.meowtedPosts.includes(result._id);
                };
                
                result.date = helper.formatDate(result.date);

                for (let i = 0; i < result.comments.length; i++) {
                    let userOwnsComment = result.comments[i].author == username;
                    let comment = {
                        _id: result.comments[i]._id,
                        author: result.comments[i].author,
                        text: result.comments[i].text,
                        parentPostId: result.comments[i].parentPostId,
                        userOwnsComment: userOwnsComment
                    }
                    comments.push(comment);
                }

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
                    comments: comments,
                    userOwnsPost: userOwnsPost,
                    userLiked: userLiked
                }

                res.render('post', details)
            })

            
        });
    },

    addComment: function(req, res) {
        let author = helper.sanitize(req.session.user);
        let text = helper.sanitize(req.query.comment);
        let postId = helper.sanitize(req.query.commentPostId);
        let js = (req.query.js != null);
        

        let newComment = new Comment({
            parentPostId: postId,
            author: author,
            text: text
        });

        helper.insertComment(postId, newComment, req, res, js);
    },

    deleteComment: function(req, res) {
        let commentId = helper.sanitize(req.query.commentId);
        let postId = helper.sanitize(req.query.postId);
        let js = (req.query.js != null);

        Comment.findOne({_id: commentId})
        .exec((err, commentResult) => {
            helper.deleteComment(commentId, commentResult.parentPostId, res, js);
        })

        
    },

    openEdit: function(req, res) {
        let postTitle = helper.sanitize(req.query.postTitle);
        let caption = helper.sanitize(req.query.caption);
        let details = {
            postTitle: postTitle,
            caption: caption,
            //Session
            active_session: (req.session.user && req.cookies.user_sid), 
            active_user: req.session.user,
            current_user: (req.session.user == req.params.username),
            //Session
        };

        res.render('partials/editPost.hbs', details)
    },

    saveEdit: function(req, res) {
        let postId = helper.sanitize(req.body.postId);
        let postTitle = helper.sanitize(req.body.postTitle);
        let caption = helper.sanitize(req.body.caption);

        helper.updatePost(postId, postTitle, caption, res);
    },

    likePost: function(req, res) {
        let username = helper.sanitize(req.session.user);
        let postId = helper.sanitize(req.query.meowtPostId);
        let js = (req.query.js != null);

        console.log("like: " + postId);

        helper.likePost(postId, username, res, js);
    },

    unlikePost: function(req, res) {
        let username = helper.sanitize(req.session.user);
        let postId = helper.sanitize(req.query.meowtPostId);
        let js = (req.query.js != null);

        console.log("like: " + postId);

        helper.unlikePost(postId, username, res, js);
    },

    deletePost: function(req, res) {
        let username = helper.sanitize(req.session.user);
        let postId = helper.sanitize(req.body.postId); 

        helper.deletePost(postId, username, res);
      
    }
}

module.exports = postController;



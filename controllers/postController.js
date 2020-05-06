const database =  require('../models/database.js');
const helper = require('./helper.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js')
const User = require('../models/user.js');

const postController = {
    
    getPost: function(req, res) {
        
        let _id = helper.sanitize(req.params._id);

        invokePost(_id, res, req, false);
    },

    addComment: function(req, res) {
        let author = helper.sanitize(req.session.user);
        let text = helper.sanitize(req.query.comment);
        let postId = helper.sanitize(req.query.commentPostId);
        let addCommentJs = (req.query.addCommentJs != null);
        

        let newComment = new Comment({
            parentPostId: postId,
            author: author,
            text: text
        });

        helper.insertComment(postId, newComment, req, res, addCommentJs);
    },

    deleteComment: function(req, res) {
        let commentId = helper.sanitize(req.query.commentId);
        let postId = helper.sanitize(req.query.postId);
        let deleteCommentJs = (req.query.deleteCommentJs != null);

        Comment.findOne({_id: commentId})
        .exec((err, commentResult) => {
            helper.deleteComment(commentId, commentResult.parentPostId, res, deleteCommentJs);
        })

        
    },

    openEditComment: function(req, res) {
        console.log('called')
        let commentId = helper.sanitize(req.query.commentId);
        let commentText = helper.sanitize(req.query.commentText);
        let openCommentEditJs = (req.query.openCommentEditJs != null);
       
        Comment.findOne({_id: commentId})
        .exec((err, commentResult) => {
            if (openCommentEditJs) {
                let details = {
                    _id: commentId,
                    text: commentResult.text,
                    //Session
                    active_session: (req.session.user && req.cookies.user_sid), 
                    active_user: req.session.user,
                    current_user: (req.session.user == req.params.username),
                    //Session
                }
                res.render('partials/editCommentForm.hbs', details);
            } else {
                Comment.findOne({_id: commentId})
                .exec((err, result) => {
                    
                    let postId = result.parentPostId;
    
                    invokePost(postId, res, req, false, commentId);
                })
            }
        })
        
    },

    submitEditComment: function(req, res) {
        let commentId = helper.sanitize(req.query.commentId);
        let newText = helper.sanitize(req.query.newText);
        let commentParentPostId = helper.sanitize(req.query.commentParentPostId);
        let submitEditCommentJs = (req.query.submitEditCommentJs != null);

        helper.editComment(commentId, commentParentPostId, newText, req, res, submitEditCommentJs);


    },

    openEdit: function(req, res) {
        let postTitle = helper.sanitize(req.query.postTitle);
        let caption = helper.sanitize(req.query.caption);
        let openEditJs = (req.query.openEditJs != null);

        if (openEditJs) {
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
        } else {
            invokePost(req.query.openEditPostId, res, req, true);
        }
        
    },

    saveEdit: function(req, res) {
        let saveEditPostId = helper.sanitize(req.query.saveEditPostId);
        let postTitleEditForm = helper.sanitize(req.query.postTitleEditForm);
        let captionEditForm = helper.sanitize(req.query.captionEditForm);
        let saveEditJs = (req.query.saveEditJs != null);

        helper.updatePost(saveEditPostId, postTitleEditForm, captionEditForm, res, saveEditJs);
    },

    likePost: function(req, res) {
        let username = helper.sanitize(req.session.user);
        let postId = helper.sanitize(req.query.meowtPostId);
        let likePostJs = (req.query.likePostJs != null);

        console.log("like: " + postId);

        helper.likePost(postId, username, res, likePostJs);
    },

    unlikePost: function(req, res) {
        let username = helper.sanitize(req.session.user);
        let postId = helper.sanitize(req.query.meowtPostId);
        let unlikePostJs = (req.query.unlikePostJs != null);

        console.log("like: " + postId);

        helper.unlikePost(postId, username, res, unlikePostJs);
    },

    deletePost: function(req, res) {
        let username = helper.sanitize(req.session.user);
        let deletePostId = helper.sanitize(req.body.deletePostId); 
        let deletePostJs = (req.body.deletePostJs != null);

        helper.deletePost(deletePostId, username, res, deletePostJs);
      
    }
}

module.exports = postController;


function invokePost(_id, res, req, editPostOpen, commentIdToEdit) {
    if(!(req.session.user && req.cookies.user_sid)) {
        res.redirect('/login');
        return;
    }
    
    Post.findOne({ _id: _id })
        .populate('comments')
        .lean()
        .exec((err, result) => {
            if (result == null) {
                console.log('no post returned');
                res.render('404');
                return;
            }
            //find if user owns post
            let username = req.session.user;
            database.findOne(User, { username: username }, 'posts meowtedPosts', (userResult) => {
                let userOwnsPost = false;
                let userLiked = false;
                let comments = new Array();
                if (userResult != null) {
                    userOwnsPost = userResult.posts.includes(result._id);
                    userLiked = userResult.meowtedPosts.includes(result._id);
                }
                ;
                result.date = helper.formatDate(result.date);
                for (let i = 0; i < result.comments.length; i++) {
                    let userOwnsComment = result.comments[i].author == username;
                    let openEditComment = result.comments[i]._id == commentIdToEdit;
                    let comment = {
                        _id: result.comments[i]._id,
                        author: result.comments[i].author,
                        text: result.comments[i].text,
                        parentPostId: result.comments[i].parentPostId,
                        userOwnsComment: userOwnsComment,
                        openEditComment: openEditComment
                    };
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
                    userLiked: userLiked,
                    editPostOpen: editPostOpen,
                    title: result.postTitle + ' | Catvas'
                };
                res.render('post', details);
            });
        });
}


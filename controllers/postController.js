const database =  require('../models/database.js');
const helper = require('./helper.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js')
const User = require('../models/user.js');

const postController = {
    
    getPost: function(req, res) {
        console.log('getting post...');
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

            //check whether post is owned by user
            let userOwnsPost = true;

            result.date = helper.formatDate(result.date)

            var details = {
                _id: result._id,
                postTitle: result.postTitle,
                caption: result.caption,
                imageUrl: result.imageUrl,
                date: result.date,
                numberOfMeowts: result.numberOfMeowts,
                author: result.author,
                comments: result.comments,
                userOwnsPost: userOwnsPost
            }
            res.render('post', details)
        });
    },

    addComment: function(req, res) {
        //TODO: session username
        let author = 'default';
        let text = req.query.text;
        let postId = req.query.postId;

        let newComment = new Comment({
            author: author,
            text: text
        });

        helper.insertComment(postId, newComment);

        res.render('partials/commentItem.hbs', newComment);
    },

    openEdit: function(req, res) {
        let details = {
            postTitle: req.query.postTitle,
            caption: req.query.caption
        };

        res.render('partials/editPost.hbs', details)
    },

    saveEdit: function(req, res) {
        console.log('test')
        helper.updatePost(req.query.postId, req.query.postTitle, req.query.caption);
    }
}

module.exports = postController;
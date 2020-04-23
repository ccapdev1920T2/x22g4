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

            result.date = helper.formatDate(result.date)
            res.render('post', result)
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

        
    }
}

module.exports = postController;
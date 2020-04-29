var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema ({
    parentPostId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
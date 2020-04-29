var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema ({
    author: {
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    imageUrl: {
        type: String,
    },
    numberOfMeowts: {
        type: Number,
        default: '0',
        min: '0'
    },
    usersWhoMeowted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    date: {
        type: Date,
        default: Date.now
    },
    cats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    numberOfComments: {
        type: Number,
        default: '0'
    },
    latestComment: {
        type: String
    },
    latestCommentAuthor: {
        type: String
    }
});

module.exports = mongoose.model('Post', PostSchema);
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    imageUrl: {
        type: String,
        //required: true,
        default: '/imgs/instadog.jpg'
    },
    numberOfMeowts: {
        type: Number,
        default: '0'
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
        type: mongoose.Schema.Types.ObjectId
    }],
    numberOfComments: {
        type: Number,
        default: '0'
    }
});

module.exports = mongoose.model('Post', PostSchema);
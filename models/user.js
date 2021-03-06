var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No description yet!"
    },
    avatar: {
        type: String,
        default: "default-user.png"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    meowtedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

module.exports = mongoose.model('User', UserSchema);
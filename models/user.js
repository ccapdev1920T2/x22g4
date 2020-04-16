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
        default: "/imgs/fat.jpg"
    },
    posts: [{
        type: String,
    }],
    meowtedPosts: [{
        type: String
    }],
    favoriteCats: [{
        type: String
    }]
});

module.exports = mongoose.model('User', UserSchema);
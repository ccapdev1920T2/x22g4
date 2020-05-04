const bcrypt = require('bcrypt');

const database = require("../models/database.js");
const session = require('express-session');

const User = require("../models/user.js");

const signupController = {

    getSignup: function(req, res) {
        console.log('fetching singup page...');
        res.render('signup', {
            signup_active: true,
        });
    },

    postSignup: function(req, res) {
        console.log("post sign up");
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var description = req.body.description;

        bcrypt.hash(password, 10, function(err, hash) {

            var user = {
                username: username,
                password: hash,
                email: email,
                description: description
            };

            database.insertOne(User, user, function(result) {
                req.session.user = user.username;
                res.redirect('/profile/' + username);
            });
        })
    },

    getCheckUsername: function(req, res) {
        var username = req.query.username;

        database.findOne(User, {username: username}, 'username', function(result) {
            res.send(result);
        });

    }
}

module.exports = signupController;
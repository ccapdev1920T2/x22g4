const bcrypt = require('bcrypt');

const database = require("../models/database.js");
const session = require('express-session');
const helper = require('./helper.js');
const User = require("../models/user.js");

const { validationResult } = require('express-validator');

const signupController = {

    getSignup: function(req, res) {
        res.render('signup', {
            signup_active: true,
        });
    },

    postSignup: function(req, res) {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.errors;

            res.render('signup', {
                signup_active: true,
                signupErrorMessage: errors[0].msg
            });

            return;
        }

        var username = helper.sanitize(req.body.username);
        var password = helper.sanitize(req.body.password);
        var email = helper.sanitize(req.body.email);
        var description = helper.sanitize(req.body.description);

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
        var username = helper.sanitize(req.query.username);

        database.findOne(User, {username: username}, 'username', function(result) {
            res.send(result);
        });

    }
}

module.exports = signupController;
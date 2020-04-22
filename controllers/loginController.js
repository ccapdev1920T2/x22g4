const database = require("../models/database.js");
const session = require('express-session');

const Sequelize = require('sequelize');

const User = require("../models/user.js");

const loginController = {

    getLogin: function(req, res) {
        console.log('fetching login page...');
        res.render('login');
    },

    postLogin: function(req, res) {
        console.log("post login");

        var username = req.body.username;
        var password = req.body.password;

        database.findOne(User, {username: username}, {}, function(user) {
            console.log('Searching for account... ');

            if (user && user.password === password){
              console.log('User and password is correct...redirecting...');

              req.session.user = user.username;
              res.redirect('/profile/' + username);

              console.log("Successful login of " + user.username);

            } else {
              console.log("Credentials wrong...");
            }              
        });
    }
}

module.exports = loginController;
const bcrypt = require('bcrypt');

const database = require("../models/database.js");
const session = require('express-session');

//const Sequelize = require('sequelize');

const User = require("../models/user.js");
const helper = require('./helper.js');

const { validationResult } = require('express-validator');

const loginController = {

    getLogin: function(req, res) {
        console.log('fetching login page...');
        res.render('login', {
          title: 'Login | Catvas',
          login_active: true,
        });
    },

    postLogin: function(req, res) {
      var username = helper.sanitize(req.body.loginUsername);
      var password = helper.sanitize(req.body.loginPassword);
      
      database.findOne(User, {username: username}, {}, function(user) {
          if(user) {
            bcrypt.compare(password, user.password, function(err, equal) {
              console.log(equal)
              if(equal) {
                console.log('User and password is correct...redirecting...');
                req.session.user = user.username;
                res.redirect('/home');

              } else {
                res.render('login', {
                  title: 'Login | Catvas',
                  login_active: true,
                  loginErrorMessage: 'Invalid username or password!'
                });
              }
            });
          } else {
            res.render('login', {
              title: 'Login | Catvas',
              login_active: true,
              loginErrorMessage: 'Invalid username or password!'
            });
          }
        });
    }
}

module.exports = loginController;
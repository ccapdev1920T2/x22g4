const bcrypt = require('bcrypt');

const database = require("../models/database.js");
const session = require('express-session');

//const Sequelize = require('sequelize');

const User = require("../models/user.js");
const helper = require('./helper.js');

const loginController = {

    getLogin: function(req, res) {
        console.log('fetching login page...');
        res.render('login', {
          title: 'Login | Catvas',
          login_active: true,
        });
    },

    postLogin: function(req, res) {
      console.log("post login");

      var username = helper.sanitize(req.body.username);
      var password = helper.sanitize(req.body.password);

      database.findOne(User, {username: username}, {}, function(user) {
          if(user) {
            bcrypt.compare(password, user.password, function(err, equal) {
              if(equal) {
                console.log('User and password is correct...redirecting...');
                req.session.user = user.username;
                res.send(true);

              } else {
                res.send(false);
              }
            });
          } else {
            res.send(false)
          }
        });
    }
}

module.exports = loginController;
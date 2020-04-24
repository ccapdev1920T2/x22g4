const database = require("../models/database.js");

const User = require("../models/user.js");

const userProfileController = {

    getUserProfile: function(req, res) {
        console.log("fetching user " + req.params.username + "..." );
        var query = {username: req.params.username};

        var projection = "username description avatar";

        database.findOne(User, query, projection, function(result) {
            if (result == null) {
                console.log('profile does not exist');
                res.render('404');
                return;
            }

            var details = {
                //Session
                active_session: (req.session.user && req.cookies.user_sid), 
                active_user: req.session.user,
                current_user: (req.session.user == req.params.username),

                username: result.username,
                description: result.description,
                avatar: result.avatar
            };

            res.render('user-profile', details);
        });

    },

}

module.exports = userProfileController;
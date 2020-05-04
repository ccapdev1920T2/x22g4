const database = require("../models/database.js");
const helper = require("./helper.js")
const User = require("../models/user.js");

const userProfileController = {

    getUserProfile: function(req, res) {
        var query = {username: helper.sanitize(req.params.username)};

        var projection = "username description avatar";

        //login simulation
        var username = req.session.user;

        database.findOne(User, query, projection, function(result) {
            if (result == null) {
                console.log('profile does not exist');
                res.render('404');
                return;
            }

            let userOwnsProfile = (username === result.username);

            var details = {
                //Session
                active_session: (req.session.user && req.cookies.user_sid), 
                active_user: req.session.user,
                current_user: (req.session.user == req.params.username),
                //Session

                username: result.username,
                description: result.description,
                avatar: result.avatar,
                userOwnsProfile: userOwnsProfile
            };

            res.render('user-profile', details);
        });
    },

    editProfileDescription: function(req, res) {
        let description = helper.sanitize(req.query.description);
        let details = {
            description: description,
            //Session
            active_session: (req.session.user && req.cookies.user_sid), 
            active_user: req.session.user,
            current_user: (req.session.user == req.params.username),
            //Session
        }
        res.render('partials/edit-desc.hbs', details);
    },

    submitEditProfileDescription: function(req, res) {
        let description = helper.sanitize(req.body.description);
    
        let username = req.session.user;

        helper.updateDescription(username, description, res);
    },

    submitAvatar: function(req, res) {
        
        if (!(req.file)) {
            console.log('did not get image.');
            return;
        }

        const username = req.session.user;

        var newName = username;
        var avatar = helper.renameImage(req, newName);

        helper.updateAvatar(username, avatar, res);
    }

}

module.exports = userProfileController;
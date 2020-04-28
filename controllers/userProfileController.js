const database = require("../models/database.js");
const helper = require("./helper.js")
const User = require("../models/user.js");

const userProfileController = {

    getUserProfile: function(req, res) {
        console.log("fetching user " + req.params.username + "..." );
        var query = {username: req.params.username};

        var projection = "username description avatar";

        //login simulation
        var username = 'default';

        database.findOne(User, query, projection, function(result) {
            if (result == null) {
                console.log('profile does not exist');
                res.render('404');
                return;
            }

            let userOwnsProfile = (username === result.username);
            console.log(userOwnsProfile)

            var details = {
                username: result.username,
                description: result.description,
                avatar: result.avatar,
                userOwnsProfile: userOwnsProfile
            };

            res.render('user-profile', details);
        });
    },

    editProfileDescription: function(req, res) {
        let description = req.query.description;
        let details = {
            description: description
        }
        res.render('partials/edit-desc.hbs', details);
    },

    submitEditProfileDescription: function(req, res) {
        let description = req.body.description;
    
        //login simulation
        let username = 'default';

        helper.updateDescription(username, description);
    },

    submitAvatar: function(req, res) {
        
        if (!(req.file)) {
            console.log('did not get image.');
            return;
        }

        const username = req.params.username;

        var newName = username;
        var avatar = helper.renameImage(req, newName);
        
        helper.updateAvatar(username, avatar);
    }

}

module.exports = userProfileController;
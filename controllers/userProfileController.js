const database = require("../models/database.js");
const helper = require("./helper.js")
const User = require("../models/user.js");

const userProfileController = {

    getUserProfile: function(req, res) {
        let username = helper.sanitize(req.params.username);
        invokeUser(username, req, res, false, false, "");
    },

    editProfileDescription: function(req, res) {
        let description = helper.sanitize(req.query.description);
        let editProfileDescriptionJs = (req.query.editProfileDescriptionJs != null);

        if (editProfileDescriptionJs) {
            let details = {
                description: description,
                //Session
                active_session: (req.session.user && req.cookies.user_sid), 
                active_user: req.session.user,
                current_user: (req.session.user == req.params.username),
                //Session
            }
            res.render('partials/edit-desc.hbs', details);
        } else {
            invokeUser(req.session.user, req, res, false, true, '');
        }
        
    },

    submitEditProfileDescription: function(req, res) {
        let descriptionEditForm = helper.sanitize(req.query.descriptionEditForm);
        let username = req.session.user;
        let submitEditProfileDescriptionJs = (req.query.submitEditProfileDescriptionJs != null);

        helper.updateDescription(username, descriptionEditForm, res, submitEditProfileDescriptionJs);
    },

    openChangeAvatar: function(req, res) {
        invokeUser(req.session.user, req, res, true, false, '');
    },

    submitAvatar: function(req, res) {
        if (!(req.file)) {
            invokeUser(req.session.user, req, res, false, false, 'Image required!');
            return;
        }

        if (req.file.size >  (1048576 * 2)) {
            invokeUser(req.session.user, req, res, false, false, 'File should not be bigger than 2MB');
            return;
        }

        const username = req.session.user;

        var newName = username;
        var avatar = helper.renameImage(req, newName);

        helper.updateAvatar(username, avatar, res);
    }

}

module.exports = userProfileController;

function invokeUser(query, req, res, openChangeAvatar, openEditProfileDescription, avatarErrorMessage) {
    
    var projection = "username description avatar";
    //login simulation
    var username = req.session.user;
    database.findOne(User, {username: query}, projection, function (result) {
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
            userOwnsProfile: userOwnsProfile,
            openChangeAvatar: openChangeAvatar,
            openEditProfileDescription: openEditProfileDescription,
            avatarErrorMessage: avatarErrorMessage
        };
        res.render('user-profile', details);
    });
}

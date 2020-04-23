const database = require("../models/database.js");

const Cat = require("../models/cat.js");

const catProfileController = {

    getCatProfile: function (req, res) {
        console.log("getting profile");
        var query = {name: req.params.name};

        var projection = "name age imageUrl gender shortDescription yourCatDescription pusaThoughts notableQuotes adoptionStatus location";

        database.findOne(Cat, query, projection, function(result) {
            if (result == null) {
                console.log('no profile returned');
                res.render('404');
                return;
            }
//
            var details = {
                //Session
                active_session: (req.session.user && req.cookies.user_sid), 
                active_user: req.session.user,

                name: result.name,
                age: result.age,
                imageUrl: result.imageUrl,
                gender: result.gender,
                shortDescription: result.shortDescription,
                yourCatDescription: result.yourCatDescription,
                pusaThoughts: result.pusaThoughts,
                notableQuotes: result.notableQuotes,
                adoptionStatus: result.adoptionStatus,
                location: result.location
            };

            res.render('cat-profile', details);
        })

    }

}

module.exports = catProfileController;
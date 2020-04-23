const database = require("../models/database.js");

const Cat = require("../models/cat.js");

const LAGUNA_QUERY = {location: 'Laguna Campus'};
const MANILA_QUERY = {location: 'Taft Campus'};
const adoptCatController = {

    getCatCards: function (req, res) {
        var lagunaResult;
        var manilaResult;

        database.findManyLean(Cat, LAGUNA_QUERY, null, function(lagunaResult) {
            database.findManyLean(Cat, MANILA_QUERY, null, function(manilaResult) {
                res.render('adoptCat', {
                	lagunaCats: lagunaResult, 
                	manilaCats: manilaResult, 

                	//Session
                	active_session: (req.session.user && req.cookies.user_sid), 
                	active_user: req.session.user
                });
            });
        });

    }
}

module.exports = adoptCatController;
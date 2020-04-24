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
                    adopt_active: true
                    });
            });
        });

    }
}

module.exports = adoptCatController;
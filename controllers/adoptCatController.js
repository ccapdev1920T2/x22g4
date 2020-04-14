const database = require("../models/database.js");

const Cat = require("../models/cat.js");

const adoptCatController = {

    getCatCards: function (req, res) {
        database.findMany(Cat, null, null, function(result) {
            console.log(result);
            res.render('adoptCat', {lagunaCats: result});
        });


    }

}

module.exports = adoptCatController;
const database = require("../models/database.js");

const Cat = require("../models/cat.js");

const catProfileController = {

    getCatProfile: function (req, res) {
        var query = {name: req.params.name};

        var projection = "name age image gender shortDescription yourCatDescription pusaThoughts notableQuotes adoptionStatus location";

        //TODO: database query and return data

    }

}

module.exports = catProfileController;
const database = require("../models/database.js");
const User = require("../models/user.js");

const loginController = {

    getLogin: function(req, res) {
        res.render('login', {login_active: true, title: 'Login | Catvas'});
    }
    


}

module.exports = loginController;
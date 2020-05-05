const { check } = require('express-validator');
const User = require('../models/user.js');


const signupValidator = {

    signupValidation: function() {
        var validation = [

            check('username').notEmpty().withMessage('Invalid username!')
            .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,16}$/).withMessage('Invalid username!'),

            check('username')
            .custom(value => {
                return User.findOne({username: value}).then(user => {
                    if (user) {
                        return Promise.reject('Username already taken!');
                    }
                })
            }),

            check('password')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/).withMessage('Invalid password'),

            check('password')
            .custom((value, {req}) => {
                console.log(req.body.confirmPassword);
                if (value !== req.body.confirmPassword) {
                    throw new Error('Passwords do not match!')
                }
                return true;
            }),

            check('email', 'Invalid email!').isEmail()
        ];

        return validation;
    }

}

module.exports = signupValidator;
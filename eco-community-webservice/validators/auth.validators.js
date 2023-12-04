const { body } = require('express-validator');

const validators = {};
const passwordRedgexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 4, max: 32}).withMessage("User name format incorrect"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .matches(passwordRedgexp).withMessage("Invalid password format")
];

module.exports = validators;
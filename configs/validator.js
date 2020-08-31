const {body} = require('express-validator')

let validateRegisterAccount = ()=>{
    return [
        body('firstname', 'firstname is requied').notEmpty(),
        body('lastname', 'lastname is requied').notEmpty(),
        body('email', 'email is required').notEmpty(),
        body('email', 'email invalid').isEmail(),
        body('password', 'password is required').notEmpty()
    ]
}

let validateLogin = ()=>{
    return [
        body('email', 'email is required').notEmpty(),
        body('email', 'email invalid').isEmail(),
        body('password', 'password is required').notEmpty()
    ]
}

let validate = {
    validateRegisterAccount: validateRegisterAccount,
    validateLogin: validateLogin
}

module.exports = {validate}
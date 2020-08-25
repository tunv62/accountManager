const {check} = require('express-validator')

let validateRegisterAccount = ()=>{
    return [
        check('account.name', 'name does not emty').notEmpty(),
        check('account.email', 'mail does not emty').notEmpty(),
        check('account.email', 'invalid email').isEmail(),
        check('account.password', 'pass word more than 6 digit').isLength({min:6})

    ]
}

let validateLogin = ()=>{
    return [
        check('account.email', 'email does not emty').notEmpty(),
        check('account.email', 'invalid email').isEmail(),
        check('account.password', 'password more than 8 digits').isLength({min: 6})
    ]
}

let validate = {
    validateRegisterAccount: validateRegisterAccount,
    validateLogin: validateLogin
}

module.exports = {validate}
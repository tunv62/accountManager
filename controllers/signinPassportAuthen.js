const passport = require('passport')

module.exports = passport.authenticate('local.login', {
    successRedirect: '/admin',
    failureRedirect: '/signin',
    failureFlash: true
})
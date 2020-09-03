const passport = require('passport')

module.exports = passport.authenticate('local.register', {
    successRedirect: '/logged',
    failureRedirect: '/signup',
    failureFlash: true
})
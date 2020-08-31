const User = require('../models/user')

module.exports = (req, res) => {
    User.find({}, (err, user) => {
        res.render('admin', {
            data: user
        })
    })
}

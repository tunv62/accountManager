const { model } = require("../models/user")

module.exports = (req, res) => {
    console.log('-------signin')
    let messages = req.flash('error')
    res.render('signin', {
        messages: messages,
        hasErrors: messages.length > 0
    })
}
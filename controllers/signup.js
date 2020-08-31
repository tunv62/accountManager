module.exports = (req, res) => {
    let messages = req.flash('error')
    console.log('---------inside signup----')
    res.render('signup', {
        messages: messages,
        hasErrors: messages.length > 0
    })
}
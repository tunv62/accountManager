module.exports = (req, res) => {
    console.log('----------inside home')
    console.log(req.query)
    res.render('home')
}
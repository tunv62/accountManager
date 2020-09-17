const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const isAdmin = require('./middleware/isAdminAuth')
const adminController = require('./controllers/admin')
const User = require('./models/user')

const homeController = require('./controllers/home')
const signupController = require('./controllers/signup')
const {validate} = require('./configs/validator')
const signinErrorInputController = require('./controllers/signinErrorInput')
const signupErrorInputController = require('./controllers/singupErrorInput')
const signupPassportAuthenController = require('./controllers/signupPassportAuthen')
const signinController = require('./controllers/signin')
const signinPassportAuthenController = require('./controllers/signinPassportAuthen')
const logoutController = require('./controllers/logout')
const isAuthen = require('./middleware/isAuthen')
const loggedController = require('./controllers/logged')
const { processUserArrayToReturn} = require('./controllers/processDataToReturn')

const app = express()

app.use(express.static('public'))

require('./configs/passport')

mongoose.connect('mongodb://localhost/demofinal', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'key encode',
    cookie: {
        maxAge: 5 * 60 * 1000
    }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.listen(4001, () => {
    console.log('server listening on port 4000')
})

app.get('/', homeController)

app.get('/signup', signupController)

app.post('/signup', validate.validateRegisterAccount(), signupErrorInputController, signupPassportAuthenController)

app.get('/signin', signinController)

app.post('/signin',validate.validateLogin(), signinErrorInputController, signinPassportAuthenController)

app.get('/auth/logout', logoutController)

app.get('/logged', isAuthen, loggedController)

app.get('/admin', isAuthen, isAdmin, adminController)

app.get('/admin/loadDataTable', isAuthen, isAdmin, (req, res)=>{
    User.find({}, function(err, user){
        if (err) return res.status(500).send('there was a problem deleting the user')
        let data = processUserArrayToReturn(user)
        res.status(200).json({ data: data})
        res.end()
    })
})

app.delete('/admin/:id', isAuthen, isAdmin, function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.")
        res.status(200).send('delete success')
        res.end()
    })
})

app.put('/admin/:id', isAuthen, isAdmin, function(req, res){
    let { firstname, lastname} = req.body
    console.log(firstname, lastname)
    User.findByIdAndUpdate(req.params.id, {
        info: {
            firstname: firstname,
            lastname: lastname
        }
    } ,(err, user)=> {
        if (err) return res.status(500).send('There was a problem updating the user.')
        res.status(200).send("update success")
    })
})

app.get('/admin/pagination',isAuthen, isAdmin, function(req, res){
    let page = parseInt( req.query.page || 1)
    let perPage = 2
    console.log('why')
    User.find({}).skip(perPage * (page -1)).limit(perPage).exec(function(err, result){
        if (err) return res.status(500).send('there was a problem deleting the user')
        let data = processUserArrayToReturn(result)
        res.status(200).json({ data: data})
    })
})

app.get('/admin/search', function(req, res){
    let keySearch = req.query.keySearch
    let seeCurrent = parseInt(req.query.seeCurrent)
    let perPage = 2
    User.find({
        // $text: { $search: "\""+ keySearch +"\""}
        $text: { $search:  keySearch}
    }).skip(perPage * (seeCurrent - 1)).limit(perPage).exec(function(err, result){
        if (err) return res.status(500).send('there was a problem deleting the user')
        let data = processUserArrayToReturn(result)
        res.status(200).json({ data: data})
        res.end()
    })
})
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
    console.log('on 4001 port')
})

app.get('/', homeController)

app.get('/signup', signupController)

app.post('/signup', validate.validateRegisterAccount(), signupErrorInputController, signupPassportAuthenController)

app.get('/signin', signinController)

app.post('/signin',validate.validateLogin(), signinErrorInputController, signinPassportAuthenController)

app.get('/auth/logout', logoutController)

app.get('/logged', isAuthen, loggedController)

app.get('/admin', isAuthen, isAdmin, adminController)

app.delete('/admin/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.")
        res.status(200).send("User:" + user.info.lastname +" was deleted.")
    })
})

app.put('/admin/:id', function(req, res){
    let { firstname, lastname} = req.body
    console.log(firstname, lastname)
    User.findByIdAndUpdate(req.params.id, {
        info: {
            firstname: firstname,
            lastname: lastname
        }
    } ,(err, user)=> {
        if (err) return res.status(500).send('There was a problem updating the user.')
        res.status(200).send("User:" + user.info.lastname +" was updated.")
    })
})
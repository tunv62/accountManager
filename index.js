const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {validationResult} = require('express-validator')

const registerAccountController = require('./controller/registerAccount')
const loginAccountController = require('./controller/loginAccount')
const
{ validate } = require('./controller/validator')
const app = express()

mongoose.connect('mongodb://localhost/account_manager', {useNewUrlParser: true})

global.loggedIn = null

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(4000, ()=>{
    console.log('app on 4000 port')
})

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/signin', (req, res)=>{
    res.render('signin')
})

app.post('/loginAccount', loginAccountController)

app.get('/signup', (req, res)=>{
    res.render('signup')
})

app.post('/registerAccount',validate.validateRegisterAccount() ,(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()})
        return;
    }
    res.render('home')
})
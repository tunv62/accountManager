const passport = require('passport')
const localStrategy =require('passport-local')
const User = require('../models/user')

passport.serializeUser(function(demo, done){
    console.log('inside serialize')
    done(null,demo._id)
})

passport.deserializeUser((id, done)=>{
    console.log('inside deserialize')
    // User.findById(id, (err, user)=>{
    //     done(err, user)
    // })
    User.findById(id)
    .then((result)=>{
        done(null, result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

// passport register
passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({
        'local.email': email
    }, function(err, user){
        if(err) {
            return done(err)
        }
        if(user) {
            console.log('inside account existed')
            return done(null, false, {
                message: 'account existed'
            })
        }
        User.findOne({
            'local.password': password
        }, function(err1, result){
            if(err1) {
                return done(err1)
            }
            if(result) {
                console.log('inside password existed')
                return done(null, false, {
                    message: 'password existed'
                })
            }
            var newUser = new User()
            newUser.info.firstname = req.body.firstname
            newUser.info.lastname = req.body.lastname
            newUser.local.email = email
            newUser.local.password = password

            newUser.save(function(err, result){
                if(err) {
                    return done(err)
                }else{
                    return done(null, newUser)
                }
            })
        })
    })
}))

//passport login 
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}, function(email, password, done){
    User.findOne({
        'local.email': email
    }, function(err, user){
        if(err) {
            return done(err)
        }
        if(!user) {
            console.log(typeof email)
            return done(null, false, {
                message: 'account not found'
            })
        }else if(user.local.password === password){
            
            return done(null, user)
        }else{
            console.log(user)
            console.log(password)
            return done(null, false, {
                message: 'password wrong'
            })
        }
        // User.find({
        //     'local.password': password
        // }, function(err, user))
        
    })
}))
const User = require('../models/user')
const Role = require('./role')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/demofinal', { useNewUrlParser: true })

User.create({
    info: {
        firstname: 'admin',
        lastname: 'admin'
    },
    local: {
        email: 'admin1@gmail.com',
        password: '12345',
        role: Role.admin
    }
}, (err, result)=>{
    console.log(err, result)
})


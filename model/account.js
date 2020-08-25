const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema

const accountSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

accountSchema.pre('save', function(next) {
    const account = this
    bcrypt.hash(account.password, 10, (err, result)=>{
        account.password = result
        next()
    })
})

const acc = mongoose.model('account', accountSchema)

module.exports = acc
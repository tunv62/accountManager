const mongoose = require('mongoose')
const Role = require('../configs/role')

const userSchema = new mongoose.Schema({
    info: {
        firstname: String,
        lastname: String
    },
    local: {
        email: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String,
            default: Role.user
        }
    }
})

module.exports = mongoose.model('User', userSchema)
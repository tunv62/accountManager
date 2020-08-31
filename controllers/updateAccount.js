const User = require('../models/user')

module.exports = (req, res)=>{
    User.findByIdAndUpdate(req.params.id)
}
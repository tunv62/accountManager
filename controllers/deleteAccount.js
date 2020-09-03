const User = require('../models/user')

module.exports = (req, res)=>{
    User.findOneAndDelete(req.params.id, (err, data)=>{
        if(err) console.log(err)
        else console.log('delete success')
        res.send('ok')
    })
}
const Role = require('../configs/role')

module.exports = (req, res, next)=>{
    let { local } = req.user
    if (local.role === Role.admin){
        next()
    }else res.send('not have access')
}
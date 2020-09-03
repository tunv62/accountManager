
let processUserArrayToReturn = (userArray) => {
    let data = []
    for (let item of userArray) {
        let obj = {
            info: {
                firstname: item.info.firstname,
                lastname: item.info.lastname
            },
            local: {
                email: item.local.email
            },
            _id: item._id
        }
        data.push(obj)
    }
    return data
}

module.exports = {
    processUserArrayToReturn: processUserArrayToReturn
}
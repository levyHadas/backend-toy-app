const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


// function checkLogin(user) {
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ nickname }))
// }


// function getById(id) {
//     const _id = new ObjectId(id)
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ _id }))
// }
function checkLogin(user) {
    if (user.username && user.password) {
        const username = user.username
        return mongoService.connect()
            .then(db => db.collection('user').findOne({ 'username':username }))
            .then(res => {
                console.log(res.password === user.password)
                if (res.password === user.password) return res
                else return Promise.reject()
            })
        }
    else return Promise.reject()
    
}



// function query() {
//     return mongoService.connect()
//         .then(db => db.collection('user').find({}).toArray())
// }

// todo  - add user only if nickname is not taken
function addUser(user) {
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(res => {
            user._id = res.insertedId
            return user
        })
}







module.exports = {
    // query,
    // getById,
    addUser,
    checkLogin
    // checkLogin
}
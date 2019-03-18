const userService = require('../services/user-service')
const toyService = require('../services/toy-service')

const BASE_PATH = '/user'



function addUserRoutes(app) {


    //create user
    app.post('/signup', (req, res) => {
        const username = req.body.username
        const password = req.body.password
        const isAdmin = req.body.isAdmin
        userService.addUser({ username, password, isAdmin })
            .then(user => res.json(user))
    })
 

    app.put('/login', (req, res) => {
        if (req.body.username && req.body.password) { 
            const username = req.body.username
            const password = req.body.password
            userService.checkLogin({ username, password })
                .then(user => {
                    req.session.user = user
                    return res.json(user)
                })
                .catch((res) => {
                    console.log('rejected')
                    // res.end()
                    return res
                })
            }
            else {
                res.end()
                return Promise.reject()
        }
    })

}


    
    //get users
    // app.get(BASE_PATH, (req, res) => {
    //     userService.query()
    //         .then(users => res.json(users))
    // })

    // get user
    // app.get(`${BASE_PATH}/:id`, (req, res) => {
    //     const userId = req.params.id
    //     Promise.all([
    //         userService.getById(userId),
    //         reviewService.query({ userId })
    //     ])
    //         .then(([user, reviews]) => {
    //             console.log({ user })
    //             res.json({ user, reviews })
    //         })
    // })

    module.exports = addUserRoutes;
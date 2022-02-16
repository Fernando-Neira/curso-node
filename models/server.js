const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        this.paths = {
            users: '/api/users'
        }

        this.connectDatabase()

        this.middlewares()

        this.routes()
    }

    async connectDatabase() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        this.app.user(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }

}

module.exports = Server

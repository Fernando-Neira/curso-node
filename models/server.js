const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search'
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
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/users.routes'))
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.categories, require('../routes/categories.routes'))
        this.app.use(this.paths.products, require('../routes/products.routes'))
        this.app.use(this.paths.search, require('../routes/search.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }
}

module.exports = Server

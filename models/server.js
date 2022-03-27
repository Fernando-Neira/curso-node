const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080

        this.paths = [
            {
                path: '/api/users',
                route: '../routes/users.routes'
            },
            {
                path: '/api/auth',
                route: '../routes/auth.routes'
            },
            {
                path: '/api/categories',
                route: '../routes/categories.routes'
            },
            {
                path: '/api/products',
                route: '../routes/products.routes'
            },
            {
                path: '/api/search',
                route: '../routes/search.routes'
            },
            {
                path: '/api/uploads',
                route: '../routes/uploads.routes'
            }
        ]

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
        this.app.use(fileUpload({
            createParentPath: true,
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))
    }

    routes() {
        for (const { path, route } of this.paths) {
          this.app.use(path, require(route))
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }
}

module.exports = Server

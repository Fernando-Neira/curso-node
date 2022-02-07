const express = require('express')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080

        this.middlewares()

        this.routes()
    }

    middlewares() {
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hello World!')
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        })
    }

}

module.exports = Server

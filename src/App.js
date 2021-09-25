const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { Auto } = require('./auto/auto')
const { UserRoutes } = require('./routes/index.routes')

class App {

    constructor(port) {
        this.app = express()
        this.port = port

        this.Settings()
        this.Middleware()
        this.Routes()
    }

    async Settings() {
        this.app.set('port', this.port)
        await Auto()
    }

    Middleware() {
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    Routes() {
        this.app.use('/api/users', UserRoutes)
        // Not Found
        this.app.use(function (req, res, next) {
            return res.status(404).json({
                error: "Not found"
            })
        })
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log("Server listening on port", this.app.get('port'))
    }

}

module.exports = { App }
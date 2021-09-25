const jwt = require('jsonwebtoken')
const config = require('../config/config')

function authenticate(req, res, next) {
    try {
        const token = req.header('x-access-token')?.replace('Bearer ', '')
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access Denied'
            })
        }

        const verify = jwt.verify(token, config.JWT.secret_key)
        if (!verify) {
            return res.status(401).json({
                success: false,
                error: 'Invalid Token'
            })
        }

        req.user = verify
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    authenticate
}
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function CreateToken(user_id, email) {
    return jwt.sign({
        user_id,
        email        
    }, config.JWT.secret_key)
}

module.exports = {
    CreateToken
}
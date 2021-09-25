const bcrypt = require('bcryptjs')

async function EncryptPassword(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

async function ComparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    EncryptPassword,
    ComparePassword
}
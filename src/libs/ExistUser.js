const pool = require('../DB')

async function ExistEmail(email) {
    const user = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if (user.length > 0) return true
    return false
}

async function ExistUser(uid) {
    const user = await pool.query('SELECT * FROM users WHERE id = ?', [uid])
    if (user.length > 0) return true
    return false
}

module.exports = {
    ExistEmail,
    ExistUser
}
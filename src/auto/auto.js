const pool = require('../DB')
const { EncryptPassword } = require('../security/password')
const { CreateToken } = require('../middleware/Token')

async function Auto() {
    const exist = await pool.query('SELECT * FROM users WHERE email = ?', ["user@test.com"])
    if (exist.length < 1) {
        const user = {
            first_name: 'Test',
            last_name: 'User',
            email: "user@test.com",
            password: await EncryptPassword("password"),
            age: 24,
            image: "https://media.istockphoto.com/photos/male-programmer-working-on-new-project-picture-id1274948583?s=612x612",
            description: "Some description for this user"
        }
        const result = await pool.query('INSERT INTO users SET ?', [user])
        const token = CreateToken(result.insertId, user.email)
        await pool.query('UPDATE users SET token = ? WHERE id = ?', [token, result.insertId])
    }
}

module.exports = { Auto }
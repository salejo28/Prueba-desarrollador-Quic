const pool = require('../DB')
const { ExistEmail } = require('../libs/ExistUser')
const { EncryptPassword, ComparePassword } = require('../security/password')
const { CreateToken } = require('./Token')

async function Login(data) {
    
    if (!await ExistEmail(data.email)) return {
        success: false,
        error: "Error in user or password"
    }

    let user = await pool.query('SELECT id, email, password FROM users WHERE email = ?', [data.email])

    const matchPassword = await ComparePassword(data.password, user[0].password)
    if (!matchPassword) return {
        success: false,
        error: "Error in user or password"
    }

    const token = CreateToken(user[0].id, user[0].email)
    await PutUser({ token }, user[0].id)
    user = await GetUser(user[0].id)
    return {
        success: true,
        user: user[0]
    }
}

async function Register(data) {
    if (await ExistEmail(data.email)) return {
        success: false, 
        errors: { message: 'Email is already exist!', path: ['email'] }
    }

    data.password = await EncryptPassword(data.password)

    const result = await pool.query('INSERT INTO users SET ?', [data])
    const token = CreateToken(result.insertId, data.email)
    await PutUser({ token }, result.insertId)
    const user = await GetUser(result.insertId)
    return {
        success: true,
        errors: null,
        user: user[0]
    }
}

async function GetUser(id) {
    return await pool.query('SELECT id, first_name, last_name, email, token, age, image, description FROM users WHERE id = ?', [id])
}

async function GetUsers() {
    return await pool.query('SELECT id, first_name, last_name, email, token, age, image, description FROM users')
}

async function PutUser(data, id) {  
    return await pool.query('UPDATE users SET ? WHERE id = ?', [data, id])
}   

async function DeleteUser(id) {
    return await pool.query('DELETE FROM users WHERE id = ?', [id])
}

module.exports = {
    Login,
    Register,
    GetUsers,
    GetUser,
    PutUser,
    DeleteUser
}
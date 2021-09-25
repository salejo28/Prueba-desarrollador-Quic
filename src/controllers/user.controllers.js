const { validationResult } = require('express-validator')
const { ExistUser } = require('../libs/ExistUser')
const { GetUsers, Register, Login, GetUser, DeleteUser, PutUser } = require('../middleware/Users')

class UsersController {

    async login(req, res) {
        const { success, error, user } = await Login(req.body)
        if (!success) return res.status(401).json({
            success,
            error
        })
        return res.status(200).set('x-access-token', `Bearer ${user.token}`).json({
            success,
            user
        })
    }

    async createUser(req, res) {
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() })
        }
        const { errors, success, user } = await Register(req.body)
        if (!success) return res.status(400).json({
            success,
            errors
        })

        return res.status(200).json({
            success,
            errors,
            user
        })
    }

    async GetUser(req, res) {
        const { uid } = req.params;

        const user = await GetUser(uid)
        if (!user.length) return res.status(404).json({
            error: "User don't exist!"
        })
        return res.status(200).json({
            user: user[0]
        })
    }

    async GetUsers(req, res) {
        const users = await GetUsers()
        return res.status(200).json({
            users
        })
    }

    async PutUser(req, res) {
        const { uid } = req.params;
        if (!await ExistUser(uid)) return res.status(404).json({
            error: "User don't exist!"
        })
        await PutUser(req.body, uid)
        const user = await GetUser(uid)
        return res.status(200).json({
            user: user[0]
        })
    }

    async PatchUser(req, res) {
        const { uid } = req.params;
        if (!await ExistUser(uid)) return res.status(404).json({
            error: "User don't exist!"
        })
        await PutUser(req.body, uid)
        const user = await GetUser(uid)
        return res.status(200).json({
            user: user[0]
        })
    }

    async DeleteUser(req, res) {
        const { uid } = req.params;
        const user = await GetUser(uid)
        if (!user.length) return res.status(404).json({
            error: "User don't exist!"
        })
        await DeleteUser(uid)
        return res.status(200).json({
            user: user[0]
        })
    }

}

module.exports = { UsersController }
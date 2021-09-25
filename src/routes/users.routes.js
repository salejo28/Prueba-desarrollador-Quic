const { Router } = require('express')
const { body, check } = require('express-validator')
const { UsersController } = require('../controllers/user.controllers')
const { ensureJson } = require('../middleware/ensurejson')
const { authenticate } = require('../auth/auth')

class UsersRoutes {
    constructor() {
        this.router = Router()
        this.controller = new UsersController()

        this.Login()
        this.CreateUser()
        this.GetUser()
        this.GetUsers()
        this.PutUser()
        this.PatchUser()
        this.DeleteUser()
    }

    Login() {
        this.router.post('/login', ensureJson, this.controller.login)
    }

    CreateUser() {
        this.router.post('/', [
            ensureJson,
            authenticate,
            body('first_name', 'First name is required!')
                .exists(),
            body('last_name', 'Last name is required!')
                .exists(),
            body('email', 'Invalid Email!')
                .exists()
                .isEmail(),
            body('password', 'Password is required')
                .exists(),
            body('age', 'Age is required!')
                .exists(),
            body('image', 'Image is required!')
                .exists(),
            body('description', 'Description is required!')
                .exists(),
            check('password')
                .isLength({ min: 6 })
                .withMessage('Must be at least 5 chars long'),
            check('age')
                .isLength({ max: 3 })
                .isNumeric()
                .withMessage('Must be a number')
        ], this.controller.createUser)
    }

    GetUser() {
        this.router.get('/:uid', [ensureJson, authenticate], this.controller.GetUser)
    }

    GetUsers() {
        this.router.get('/', [ensureJson, authenticate], this.controller.GetUsers)
    }

    PutUser() {
        this.router.put('/:uid', [
            ensureJson,
            authenticate,
            body('first_name', 'First name is required!')
                .exists(),
            body('last_name', 'Last name is required!')
                .exists(),
            body('email', 'Invalid Email!')
                .exists()
                .isEmail(),
            body('password', 'Password is required')
                .exists(),
            body('age', 'Age is required!')
                .exists(),
            body('image', 'Image is required!')
                .exists(),
            body('description', 'Description is required!')
                .exists(),
            check('password')
                .isLength({ min: 6 })
                .withMessage('Must be at least 5 chars long'),
            check('age')
                .isLength({ max: 3 })
                .isNumeric()
                .withMessage('Must be a number')
        ], this.controller.PutUser)
    }

    PatchUser() {
        this.router.patch('/:uid', [ensureJson, authenticate], this.controller.PatchUser)
    }

    DeleteUser() {
        this.router.delete('/:uid', [ensureJson, authenticate], this.controller.DeleteUser)
    }
}

module.exports = new UsersRoutes().router
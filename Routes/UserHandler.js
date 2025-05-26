const express = require('express')
const router = express.Router()

const usercontroller = require('../Controllers/UsersController')
const passport = require('passport')

router.post('/register', usercontroller.register)
router.post('/login', usercontroller.login)

module.exports = router
const express = require('express')
const Controller = require('../controller/controller')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login-google', Controller.loginGoogle)

router.use(authentication)

router.get('/', Controller.home)

module.exports = router
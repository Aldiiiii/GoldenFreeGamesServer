const express = require('express')
const Controller = require('../controller/controller')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login-google', Controller.loginGoogle)

router.use(authentication)

router.get('/', Controller.home)
router.post('/collections', Controller.addCollections)
router.get('/collections', Controller.collections)
router.patch('/collections', Controller.changeStatus)
router.get('/collections/:id', Controller.gamesById)

module.exports = router
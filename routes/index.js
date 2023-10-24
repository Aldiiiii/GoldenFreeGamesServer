const express = require('express')
const Controller = require('../controller/controller')
const router = express.Router()

router.post('/register', Controller.register)

module.exports = router
const { User } = require('../models')
const jwt = require('jsonwebtoken')

async function authentication(req, res, next){
    try {
        const { access_token } = req.headers
        if(!access_token){
            throw {name: "Invalid token"}
        }

        const payload = jwt.verify(access_token, 'SECRET')
        const findUser = await User.findByPk(payload.id)

        if(!findUser){
            throw {name: 'Invalid token'}
        }
        
        req.user = {
            id: findUser.id,
            email: findUser.email,
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication
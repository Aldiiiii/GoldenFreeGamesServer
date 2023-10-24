const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./routes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.use((err, req, res, next) => {
    let code = 500
    let message = "Internal server error"

    if(err.name === "SequelizeValidationError"){
        code = 400
        message = err.errors[0].message
    }

    res.status(code).json({message})
})

app.listen(port, () => {
    console.log('Now Playing: Stephanie Poetri - I Love You ' + port)
})
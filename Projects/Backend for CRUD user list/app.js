const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const controller = require('./controllers/users')
const sequelize = require('./utils/database')
const app = express()
app.use(cors())
app.use(bodyParser.json({ extended: false }));



app.get('/', controller.getUsers)
app.post('/', controller.postUsers)
app.delete('/:id', controller.deleteUser)
app.get('/:id', controller.getUpdateUser)
app.put('/:id', controller.putUpdateUser)

sequelize.sync()
    .then(()=>{
        app.listen(3000)
    })

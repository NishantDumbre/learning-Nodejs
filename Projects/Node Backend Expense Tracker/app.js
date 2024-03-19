const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./backend/utils/database')
const routes = require('./backend/routes/routes')
const app = express()
app.use(cors())
app.use(bodyParser.json({ extended: false }));

app.use(routes)

sequelize.sync()
    .then(()=>{
        app.listen(8080)
    })
    .catch((err)=>console.log(err))


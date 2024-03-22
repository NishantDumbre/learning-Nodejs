const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./backend/utils/database')
const routes = require('./backend/routes/routes')
const Blogs = require('./backend/models/blogModels')
const Comments = require('./backend/models/commentModels')
const app = express()


app.use(cors())
app.use(bodyParser.json({ extended: false }));

app.use(routes)

Blogs.hasMany(Comments)

sequelize.sync()
    .then(()=>{
        app.listen(8080)
    })
    .catch((err)=>console.log(err))


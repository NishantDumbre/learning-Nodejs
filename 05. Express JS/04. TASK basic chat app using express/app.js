const express = require('express')
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login')
// importing required files and login routes


const app = express()

app.use(bodyParser.urlencoded({extended:false}))
// used bodyParser here since any request will go through this top middleware and then make it to the routes below. The body thus will already be parsed, call next and pass the request


app.use('/routes',loginRoutes)
// plugging in the routes that were imported. Any request made will access the routes file and search for the matching URL and method

app.use('./',(req,res,next)=>{
    res.sendStatus(404).send('<h1>Error 404: Page not found</h1>')
})


app.listen(1000)
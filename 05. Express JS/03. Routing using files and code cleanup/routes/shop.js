const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) =>{
    console.log("This is the homepage for /")
    res.send("<h1>This is the homepage</h1>")
})

module.exports = {
    router:router
}
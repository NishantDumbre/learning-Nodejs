const express = require('express')
const path = require('path')
const router = express.Router()

const rootPath = require('../utils/path')


router.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','contactus.html'))
})

router.post('/contactus',(req,res,next)=>{
    console.log(res.body)
    res.redirect('/success')
})

router.get('/success',(req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','success.html'))
})

module.exports = {
    router: router
}
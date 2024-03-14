const express = require('express')
const path = require('path')
const router = express.Router()

const rootPath = require('../utils/path')

router.get('/add-product',(req,res,next) =>{
    console.log("add product")
    res.sendFile(path.join(rootPath,'views','add-product.html'))
})
//Path is a module that is provided by Express. Path basically is used to define path in server side using Express. Now for sending files we have to use res.sendFile() and we have to pass the path. Express takes the absolute path you cannot give the relative path so to pass the absolute path we use the path.join() function to concatenate the path. First we pass root path with "__dirname" and after that we pass another few parameters. For every folder that we have to access we pass in another argument with the folder name and finally we and the arguments with the name of the file


router.post('/add-product',(req,res,next) =>{
    console.log("This is the Product page for /product")
    console.log(req.body)
    res.redirect('/')
})



module.exports={
    router:router
}
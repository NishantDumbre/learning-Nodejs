const path = require('path')
const rootPath = require('../utils/path')

exports.getAddProduct = (req,res,next) =>{
    console.log("add product")
    res.sendFile(path.join(rootPath,'views','add-product.html'))
}

exports.postAddProduct = (req,res,next) =>{
    console.log("This is the Product page for /product")
    console.log(req.body)
    res.redirect('/')
}

exports.getProducts = (req,res,next) =>{
    res.sendFile(path.join(rootPath,'views','shop.html'))
}


// Here we keep our main logic for what needs to be processed and what response/view should be sent
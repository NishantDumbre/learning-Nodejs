const path = require('path')
const rootPath = require('../utils/path')

exports.getContactus = (req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','contactus.html'))
}

exports.postContactus = (req,res,next)=>{
    console.log(res.body)
    res.redirect('/success')
}

exports.getSuccess = (req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','success.html'))
}


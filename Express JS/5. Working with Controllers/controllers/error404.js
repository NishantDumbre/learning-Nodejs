const path = require('path')
const rootPath = require('../utils/path')

exports.error404 = (req,res,next) =>{
    res.status(404).sendFile(path.join(rootPath,'views','404.html'))
}
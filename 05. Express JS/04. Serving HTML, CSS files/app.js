// Check notes in app.js, routes/admin.js and views/add-product.html

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactusRoutes = require('./routes/contactus')
const rootPath = require('./utils/path')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(rootPath,'public'))) 
//Since we are running the node which is on server side the files like HTML and CSS they do not access like the normal file systems that's why we have to use a property which comes with Express called static. Using static we have to pass in the path where files are stored and it can be accessed using the path property of Express. Once again we have to use the join command to concatenate the entire string to the complete path and then pass the reference

app.use(shopRoutes.router)

app.use('/admin',adminRoutes.router)

app.use(contactusRoutes.router)
app.use(shopRoutes.router)


app.use('/',(req,res,next) =>{
    res.status(404).sendFile(path.join(rootPath,'views','404.html'))
})

app.listen(8080)




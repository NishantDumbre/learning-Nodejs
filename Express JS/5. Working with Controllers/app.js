/* 
Models represent the data and allows us to work with the data

Views are the representation of data that the user actually sees. It's usually in the form of HTML code

Controllers act as the middlemen between the models and views. Controllers hold the actual processing logic and the operations. They are passed to models so that models will work with the controllers. Then the controllers do the actual operations and result in views

Routes are responsible for which route and which http method should the controller execute. 
*/


const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const contactusRoutes = require('./routes/contactus')
const rootPath = require('./utils/path')
const error404Controllers = require('./controllers/error404')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(rootPath,'public'))) 
//Since we are running the node which is on server side the files like HTML and CSS they do not access like the normal file systems that's why we have to use a property which comes with Express called static. Using static we have to pass in the path where files are stored and it can be accessed using the path property of Express. Once again we have to use the join command to concatenate the entire string to the complete path and then pass the reference

app.use(shopRoutes.router)

app.use('/admin',adminRoutes.router)
// First we route for the admin route in a separate file for readability. Go to ./routes/admin

app.use(contactusRoutes.router)
app.use(shopRoutes.router)


app.use('/',error404Controllers.error404)

app.listen(8080)




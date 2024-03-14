const express = require('express')
const bodyParser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
// importing the admin and shop routes 

const app = express()
app.use(bodyParser.urlencoded({extended:false}))

app.use(shopRoutes.router)
// As we know express middlewares run from top to bottom. But here we can call shopRoutes.router before adminRoutes.router because in shopRoutes.router, the handler is set to get. Thus we can interchange the below and above handlers since we can access the '/' url only if we go to that page through browser or redirect to that page. 

app.use('/admin',adminRoutes.router)
// Here we imported adminRoutes from admin.js and then since it was exported as an object, we access the specific method/property here using adminRoutes.router. We also mentioned the path as /admin here. So if we try to access localhost:port/add-product, the page won't exist since here we have mentioned that '/admin' is the parent path for the /add-products path. Thus we need to access the page using localhost:port/admin/add-product


app.use('/',(req,res,next) =>{
    res.status(404).send('<h1>Error 404: Page not found</h1>')
})
// Since in the shop.js file, the path '/' is set to method get using router.get, the response is absolute and we can access the '/' url only if we go to that page through browser or redirect to that page. If we used router.use instead of router.get in shop.js file, any path lets say '/xyz' would land on '/'. But since router.get is used, the app.js file would start searching from top, never hit the router.get method in the shop.js file and end the execution giving us an error. Thus we set here a '/' path with use so that it will intercept all kinds of requests. This allows us to send a response for any path not mentioned, which we do so by giving 404 error.

app.listen(8080)




const express = require('express')
const router = express.Router()
// Importing executed function express.Router() to const router. Router() is like a mini express app tied to other express app


router.get('/add-product',(req,res,next) =>{
    console.log("add product")
    res.send("<html><body><h1>This is the Add product page</h1><form action='/admin/product' method='POST'><input type='text' name='product' /><input type='number' name='size' /><button type='submit'>Add product</button></form></body></html>")
})
// Instead of using "const app = express()" earlier and then accessing the properties of app, we access the properties of router.


router.post('/product',(req,res,next) =>{
    console.log("This is the Product page for /product")
    console.log(req.body)
    res.redirect('/')
})


module.exports={
    router:router
}
// we export the router object as a method. Our router object will have access to its methods and properties like .use/post/get etc
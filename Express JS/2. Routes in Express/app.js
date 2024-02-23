const express = require('express')
const bodyParser = require('body-parser')
// body-parser is a express js module which comes also as a 3rd party npm package. In vanilla js we used to gather the chunks of data that we got in a request, pass it to a buffer. This was coded in multiple lines. Body parser does the same in a single line of code as given in line 7.


const app = express()
app.use(bodyParser.urlencoded({extended:false}))
// The function that we've passed in app.use will parse the body through body-parser and automatically hit next() so that the next middlewares can execute


app.use('/',(req,res,next) =>{
    console.log("This always runs")
    next()
})
// The app.use will work for all requests. Since we mentioned '/' in the URL, this middleware will always execute. Middleware follow top to bottom flow. When we specity '/' as url, it doesn't specifically mean to only work for that, but it will run for all the URLs that begin with '/'. When get/post request is made the above middleware for '/' will automatically run. If next() wasn't included in the above middleware, then the below middlewares would never have executed


app.use('/add-product',(req,res,next) =>{
    console.log("add product")
    res.send("<html><body><h1>This is the Add product page</h1><form action='/product' method='POST'><input type='text' name='product' /><input type='number' name='size' /><button type='submit'>Add product</button></form></body></html>")
})
// On going to this page, the '/' middleware above will hit first and then this will hit. It will send a response through res.send(). Unlike vanilla JS where we could write multiple response.write and then end with res.end here the res.send() is part of express js. So it is created in such a way that it automatically ends the response. So we can call res.send() only once

app.post('/product',(req,res,next) =>{
    console.log("This is the Product page for /product")
    console.log(req.body)
    res.redirect('/')
})
// This app.post only triggers when it intercepts a POST request for '/product'. We can also use app.get/post/patch/updateThe req.body will give us the parsed body. In vanilla js we used to setHeader('Location','/') to redirect to '/'. But in express we use res.redirect('/') to achieve the same. 

app.use('/',(req,res,next) =>{
    console.log("This is the homepage for /")
    res.send("<h1>This is the homepage</h1>")
})
// If run the page for '/', the very first middleware on line 11 will run. Since it has a next() call, the control transfer to this middleware. Here it sends a response. Thus we see the log for both the middlewares


app.listen(8080)




//const http = require('http')
//  we don't need to import http module since express is able to do so and create as server by its own


const express = require('express')
// we import express here. It imports a function as seen in the source code and the function is stored in the variable

const app = express()
// the function stored in the variable 'express' is executed and stored in app


app.use((req,res,next) =>{
    console.log("middleware")
    next()
})
// app.use does the job of handling requests. It takes req, res and next. Here next means the next function that is to be run. This kind of works like a callback. If we call next() then the next middleware is executed, that is we get access to it


app.use((req,res,next) =>{
    console.log("2nd middleware")
    res.send( { key1: 'value' })
})
// since we called next() in the previous middleware, we get access to this one. Here we use res.send instead of res.write. res.send returns responses and can send any body like strings, files, etc. The header is automatically set for the file type anmd can be checked in the network tab of the browser



// const server = http.createServer(app)
// server.listen(8080)

app.listen(8080)
// app.listen directly creates a server and starts listening on the specified port, thus killing the need to import http module



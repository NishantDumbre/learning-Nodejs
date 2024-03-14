
/* Writing and reading from a file */

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers)

    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Node Requests</title></head>')
        res.write('<body><form action="/home" method="POST"><input type="text" name="home" /><button type="submit">Go to home</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    else if (url === '/home' && method === 'POST') {
        
        const body = []
        // we create an array to hold the chunks of data

        req.on('data', (chunk) => {
            console.log(chunk, 'Chunk')
            body.push(chunk)
            console.log(body, 'Body')
        })
        // req.on is an event listener. Here it listens to the event 'data'. For each data that it listens to, the callback is run. In this callback we are pushing the incoming request data to the array

        return req.on('end', () => {
            let parsedBody = Buffer.concat(body)
            console.log(parsedBody, 'Buffer raw')
            parsedBody = parsedBody.toString()
            console.log(parsedBody, 'Buffer string')

            const message = parsedBody.split('=')[0]
            fs.writeFileSync('message.txt', message)
            //res.write('<html><head><title>Home page</title></head><body><h1>Welcome to Home</h1></body></html>')
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        })
        // req.on for the event end means that the callback will run once the request is received completely. Here we use Buffer.concat(body) to concatenate the requests to a buffer. Since we know our data is in string format, we covnert it to string. In the input field, the name property of the input was set as 'home'. Thus when we send a POST request on submitting the input, a key value pair is formed and the value entered forms a pair with the name of the input field acting as the key. So to access the value, we split the string and access it. 

    }
    else if (url === '/about') {
        res.write('<html><head><title>About page</title></head><body><h1>Welcome to About</h1></body></html>')
        return res.end()
    }
    else {
        res.write('<html><head><title>Node Page</title></head><body><h1>Welcome to Node</h1></body></html>')
        return res.end()
    }

    res.write('<html><head><title>Node Page</title></head><body><h1>Welcome to Node</h1></body></html>')
    //If there was some code outside of the if else blocks like above, that code would have been executed after our snippet where we worked on req, res. We wanted to exit the event once our server returned a response after req.on line. Thus we use the return keyword on the same line where we set req.on for 'end' line 32.
})

server.listen(8080)

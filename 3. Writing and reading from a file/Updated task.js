const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    

    if(url === '/'){
        fs.readFile('message.txt', {encoding: 'utf-8'}, (err,data) =>{
            if(err){
                console.log(err)
            }
            console.log(`data from file ${data}`)
            res.write('<html>')
            res.write('<head><title>Node Requests</title></head>')
            res.write(`<body><p>${data}</p><form action="/message" method="POST"><input type="text" name="home" /><button type="submit">Go to home</button></form></body>`)
            res.write('</html>')
            return res.end()
        })
        // In above route, we read the file that was created, if it isn't present then we get undefined. The above route gives a response having the data from the file on the screen
    }
    else if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (data) => {
            body.push(data)
        })
        return req.on('end', () => {
            let message = Buffer.concat(body).toString()
            message = message.split('=')[1]
            fs.writeFile('message.txt', message, (err)=>{
                if(err){
                    console.log(err)
                }
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
            // In this route, when we send a POST request with our data, the we write the data into the message file and redirect the user to the page '/' After that since the page is redirected, a GET request is performed and the response loads again from the code in the '/' route
        })
    }
})

server.listen(1000)
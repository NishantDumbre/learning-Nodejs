const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    let message = ''

    if (url === '/') {
        const body = []
        req.on('data', (data) => {
            body.push(data)
        })
        return req.on('end', () => {
            message = Buffer.concat(body).toString()
            message = message.split('=')[1]
            console.log(message)
            res.write('<html>')
            res.write('<head><title>Node Requests</title></head>')
            res.write(`<body><p>${message}</p><form action="/" method="POST"><input type="text" name="home" /><button type="submit">Go to home</button></form></body>`)
            res.write('</html>')
            return res.end()
        })
    }
})

server.listen(1000)

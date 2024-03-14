const http = require('http')

const routes = require('./Utask-routes.js')

const server = http.createServer(routes.handler)

server.listen(1000)
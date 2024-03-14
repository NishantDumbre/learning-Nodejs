const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node',
    password:'mysql',
})
// Everytime we run a query, it takes up the connection and we cannot run any other queries while its occupied. Thus we create a pool of connections where whenever a query is executed, it will take the connection from the pool, execute and then return the connection to the pool



module.exports = pool.promise()
// Instead of simply exporting pool, we export pool.promise() so that don't have to use callbacks and simply uise .then()
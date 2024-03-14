
/* Creating a new File through node */

let newFile = require('fs')
// require is used to call something. If the path isn't specified then it will get the global module and store its access to our newFile

newFile.writeFileSync('newFile.txt','This is a new file created through node')
// we use the writeFileSync method that we get from fs module to create a new file. This takes 2 arguments, the first specifies the name of the file and the second the content inside it




/* Creating a new Server through node */

const http = require('http')
// here we didn't pass a path so require gets us the http node module. 

const server = http.createServer((res,req) =>{
    console.log("Nishant")
})
// we access the createServer method available from the http module and this creates a server. In this server we pass a callback that executes whenever it gets a request. In the callback we pass request and response argyuments. We create a server only once just like we set up a stand/booth in an exhibition or a carnival


server.listen(8080)
// our server was just created but wasn't running anywhere to get the requests. Using listen method on the server that was created, we are able to tell the server that hey this is where you will be running, keep your booth open for any incoming customers
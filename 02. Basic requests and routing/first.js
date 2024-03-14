
/* Responses and requests */

const http = require('http')

const server = http.createServer((req,res) =>{
    console.log(req.url, req.method, req.headers)
    // Using above, we get access to the req object properties of url, method and headers. req.url contains the URL accessed. req.headers contains all the headers like cookies, OS, browser version, etc. All the metadata basically. req.method shows the method used like GET/POST

    const url = req.url

    // we are storing the req.url in a const. We check if the end of the URL is '/' that means if its the homepage. If yes then it will load the form below

    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>Node Requests</title></head>')
        res.write('<body><form action="/home" method="POST"><button type="submit">Go to home</button></form></body>')
        res.write('</html>')
        // if the URL is the homepage, then the response will be the above lines of code. The above code will execute line by line and and the response will keep sending the data thats present in the string. Here its the html code to display a simple form. You can send multiple responses using res.write()

        return res.end()
        // res.end() will stop giving out responses. This is important to show where we are stopping with our responses. We use the return statement so that we will exit the function. If we simply write res.end() without return, it will go and check the code outside the if block as well and send more responses.
    }
    else if(url === '/home'){
        res.write('<html><head><title>Home page</title></head><body><h1>Welcome to Home</h1></body></html>')
        return res.end()
    }
    else if(url === '/about'){
        res.write('<html><head><title>About page</title></head><body><h1>Welcome to About</h1></body></html>')
        return res.end()
    }
    else{
        res.write('<html><head><title>Node Page</title></head><body><h1>Welcome to Node</h1></body></html>')
        return res.end()
    }

    // Once we submit the form, the form action will redirect to the page mentioned in it and send data as well due to POST method
    

})

server.listen(8080)

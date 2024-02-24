// Below is the code for routes/login.js which I had written first. There was a major flaw in the code where one very refresh, the file got appended with a new entry and it was populated on the screen. Explained below 

const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/login', (req, res, next) => {
    console.log("Login page")
    res.send(`<html>
    <body>
        <form action="/routes/" method="POST" onSubmit="storeData()"><input type="text" name="username" id="username" /><button
                type="submit">Login</button></form>
    </body>
    <script>
        function storeData() {
            let usernameValue = document.getElementById("username").value
            localStorage.setItem("username", usernameValue)
        }
    </script>
    </html>`)
})
// no issue here


router.post('/', (req, res, next) => {

    let keys = Object.keys(req.body)
    if (keys[0] !== 'username') {        
        let username = req.body.username
        let text = req.body.text
        console.log(username)
        fs.appendFileSync("messages/texts.txt", `${username}: ${text}`)
    }
    fs.readFile("messages/texts.txt", { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            data = 'No chats exist'
        }
        res.send(`<p>${data}</p><form action="/routes/" method="POST" onSubmit="document.getElementById('username').value=
            localStorage.getItem('username')"><input type="text" name="text" id="text"/><input type="hidden" name="username" id="username"/><button type="submit">Send</button></form>`)

    })
})
// In the correct version, created a handler for only get requests for '/' and made it so that it only reads the file and sends a response with the populated HTML code. The intuition behind the above code was first let's say we are coming from the login page if we are coming from the login page the body will be having a key called as username. Now if the username is present then we don't really need to append that to our file because that's the data from the login page so we will simply send a response where we are first reading the file and then populating are HTML response with the data from that file. But if we send the post request over here on the chat window then it will send a response to the same handler and now and in this case the very first key would not be username. It's going to be text so in this case we are going to separate the username After separating we are going to appended to the file and then in the next line of code we once again read from that file and then send a response with that data. Now the problem in this code was that whenever we refresh the page for slash it already had the payload. And that is why are file got appended with the payload and once again. We get a duplicate text message even without sending one so even for refreshing the page are post request went through every time because we landed over here using that post request. The solution to this problem was separating the get and post request. We don't want to always land on the page using a post request so that's why we separated it into a get request and a post request The post request will take our data and append to the file and then redirect us to the get request. In the get request handler we will read a file and then populate the HTML so even if you refresh the page it will start by sending a get request and it will actually start by only reading the file 



module.exports = router
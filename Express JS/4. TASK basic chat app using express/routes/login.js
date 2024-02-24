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
// Made a get request handler for '/routes/login'. When we load the page, It will send the above HTML response. Node is server side thus it doesn't have access to browser local storage (there are node localStorage packages apparently, but not useful here). The client browser should hold the username in local storage. That's why created a function in script tag to setItem and calling it through onSubmit() of form. Since HTML runs on client side, the function will be executed on client side and the localStorage will be accessible on the browser. 


router.get('/',(req,res,next)=>{
    fs.readFile("messages/texts.txt", { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            data = 'No chats exist'
        }
        res.send(`<p>${data}</p><form action="/routes/" method="POST" onSubmit="document.getElementById('username').value=
            localStorage.getItem('username')"><input type="text" name="text" id="text"/><input type="hidden" name="username" id="username"/><button type="submit">Send</button></form>`)

    })
})
// When a get request is made, first fs reads the file to check if there was anything. If its a blank file, error is triggered and we set data to No chats and show it in the HTML response. If the file already has something and we reload the page, it will read the file entirely and send its contents as the response. Also we need the username to be displayed to differentiate between who sent the text, thus we keep a hidden input field. When we submit the form, we populate the hidden field with the username from localStorage and then make the post request with the new payload


router.post('/', (req, res, next) => {  
        let username = req.body.username
        let text = req.body.text
        if(text){
            fs.appendFileSync("messages/texts.txt", `${username}: ${text}`)
        }
        console.log(username,text)
        res.redirect('/routes/')
})
// When post request is triggered for '/', we check the payload. Since we sent a text as a payload in line 23 block, the request gets intercepted here and we separate the username and text. We append the file with both of them and redirect to '/'. There a get request is made and the fs reads the updated file and sends the HTML response as per it.


module.exports = router
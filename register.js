let app = require('express')()
let bodyParser = require('body-parser')
let fs = require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/register', (req, res) => {
    // id, username, email, password, phone
    // object of user details from app
    let userDetails = {
        id: Date.now(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }
    // converting user input object to sring
    let details = JSON.stringify(userDetails, null, 4) + '\r\n' 

    fs.readFile('userDetails.json', 'utf-8', (err, data) => {
        if(err) {
            fs.writeFile('userDetails.json', '[' + details + ']', (err, data) => {
                if (err) throw err
            })
        }
        else {
            // converting data to object 
            let userData = JSON.parse(data)
            userData.push(userDetails)     // adding new object to json data
            userData = JSON.stringify(userData, null, 4)    // again converting object array to json format
            fs.writeFile('userDetails.json', userData, (err, data) => {
                if (err) throw err
            })
            }
        })
        res.send(userDetails)
})

app.listen(3000)
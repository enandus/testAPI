let app = require('express')()
let bodyParser = require('body-parser')
let fs = require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

let middleWare = (req, res, next) => {
    console.log('Hello World!')
    fs.readFile('userDetails.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('User Database not found!')
        }
        else {
            let userData = JSON.parse(data)
            for (let i = 0; i < userData.length; i++) {
                console.log("inside looop ")
                let detail = userData[i]
                console.log("req.params",req.params.username,detail.username)
                if(req.params.username == detail.username && req.params.password == detail.password) {
                   console.log(req.params+ "-" + detail)
                   next()
                    break;

                }
                else{
                    console.log('inside else', userData.length + '-' + i)
                    if(userData.length == i+1) {
                        res.sendStatus(401)
                    }
                }
            }
           
        }
    })
}

app.get('/login/:username/:password', middleWare, (req, res) => {
    res.sendStatus(200)

})

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

 // if(flag == 1){
            //     res.sendStatus(200)
            // }
            // else { 
            //     res.sendStatus(401)
            // }
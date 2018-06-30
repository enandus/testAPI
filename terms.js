let app = require('express')()
let bodyParser = require('body-parser')
let fs = require('fs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/terms', (req, res) => {
    fs.readFile('terms.txt', 'utf-8', (err, data) => {
        if (err) {
            // console.log('error')
            res.send('Terms And Conditions')
        }
        else {
            // console.log(data)
            res.send(data)
        }
    })
})

app.listen(3000)
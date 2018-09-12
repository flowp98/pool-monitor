const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const api = require('./api/api')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use('/js',express.static(__dirname + '/js'))
app.use('/css',express.static(__dirname + '/css'))

app.use('/api', api)
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, function() {
    console.log('SERVER RUNNING ON localhost:' + PORT);
})
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const taskRoutes = require('./routes/taskRoutes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))
app.use(express.json())

//conexion de mongobd

const dbUrl = ''
mongoose.connect(dbUrl,{useUnifiedTopology: true})
.then((result) =>{
  // app.listen(4000)
})
.catch((error) => console.log(error))

//routes
app.get('/', (request, response) => {
  response.send('TASK APP')
})


app.use(taskRoutes)
module.exports = app;
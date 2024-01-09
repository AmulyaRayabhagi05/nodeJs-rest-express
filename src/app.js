const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected'))

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`)
})

const postRoutes = require('./routes/post')
// middleware

app.use(morgan('dev')) // validate or authotensize
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/', postRoutes)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`)
})

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")



const usersRoutes = require('./api/routes/users')
const fournisseurRoutes = require('./api/routes/fournisseur')
const clientsRoutes = require('./api/routes/clients')
const clientsfoursRoutes = require('./api/routes/clientFournisseur')




mongoose.connect('mongodb+srv://soulaimanestudent7:HmKmrB81sSpODs1v@cluster0.dxc2f.mongodb.net/')
mongoose.Promise = global.Promise



app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next( )
})



// Routes Requests

app.use('/users', usersRoutes)
app.use('/fournisseurs', fournisseurRoutes)
app.use('/clients', clientsRoutes)
app.use('/clientsfour', clientsfoursRoutes)


app.use('/uploads', express.static('Uploads'))
app.use('/assets', express.static('View/assets'))



// Server Pages

const path = require('path');

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './View/index.html'))
})

app.use((req, res, next) => {
    const error = new Error('Not fount')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
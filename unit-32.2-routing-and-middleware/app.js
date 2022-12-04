const express = require('express')
const app = express()
const ExpressError = require('./expressError')
const itemRoutes = require('./items')

app.use(express.json())

app.use('/items', itemRoutes)

app.get('/', (req, res, next)=>{
    return res.send("Hello there")
})

app.use((err, req, res, next)=>{
    return res.status(err.status).json({error : {message : err.message}})
})

module.exports = app
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const app = express()

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/linkdash')
}

mongoose.connection
  .once('open', () => console.log("Database connected!"))
  .on('error', error => {
    console.warn('Warning!', error)
  })

app.use(express.json())

module.exports = app
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const config = require('config')
const app = express()

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/linkdash', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

if (!config.get('PrivateKey')) {
  console.error('FATAL ERROR: PrivateKey is not defined!')
  process.exit(1)
}

mongoose.connection
  .once('open', () => console.log('Database connected!'))
  .on('error', (error) => {
    console.warn('Warning!', error)
  })

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

module.exports = app

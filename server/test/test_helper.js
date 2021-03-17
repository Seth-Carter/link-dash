const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/linkdash_test')
  mongoose.connection
    .on('open', () => {
      console.log('Connected to test db')
      done()
    })
    .on('error', err => {
      console.warn('Warning', err)
    })
})
const mongoose = require('mongoose')

before(done => {
  mongoose.connect('mongodb://localhost/linkdash_test', { 
    useNewUrlParser: true, useUnifiedTopology: true 
  })
  mongoose.connection
    .on('open', () => {
      console.log('Connected to test db')
      done()
    })
    .on('error', err => {
      console.warn('Warning', err)
    })
})

beforeEach(done => {
  const { users } = mongoose.connection.collections
  if (users) {
    users.drop()
      .then(() => done())
      .catch(() => done())
  } 
})
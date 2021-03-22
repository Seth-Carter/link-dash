const assert = require('assert')
const request = require('supertest')
const User = require('../models/user')
const app = require('../app')

describe('The signup route', () => {
  it('creates a new user', done => {
    let userProps = {
      name: 'Johnny',
      email: 'john@email.com',
      password: 'Password123'
    }
    request(app)
      .post('/api/signup')
      .send(userProps)
      .end((err, res) => {
        console.log(res.body)
        assert(res.body.email === userProps.email)
        done()
      }) 
  })
})
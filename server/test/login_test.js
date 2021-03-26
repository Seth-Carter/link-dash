const assert = require('assert')
const request = require('supertest')
const User = require('../models/user')
const app = require('../app')

describe('The login route', () => {

  let joe = {
    name: 'Joseph',
    email: 'joe@email.com',
    password: 'Password123'
  }

  it("allows a user to successfully log in", done => {
    request(app)
      .post('/api/user/signup')
      .send(joe)
      .then(() => {
        request(app)
          .post('/api/user/login')
          .send({ email: joe.email, password: joe.password })
          .end((err, res) => {
            const responseObject = JSON.parse(res.text)
            assert(responseObject.email === joe.email)
            done()
          })
      })
  })
})
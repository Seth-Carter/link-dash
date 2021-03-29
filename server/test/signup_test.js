const assert = require('assert')
const request = require('supertest')
const User = require('../models/user')
const app = require('../app')

describe('The signup route', () => {
  it('creates a new user', (done) => {
    const userProps = {
      name: 'Johnny',
      email: 'john@email.com',
      password: 'Password123',
    }
    request(app)
      .post('/api/user/signup')
      .send(userProps)
      .end((err, res) => {
        assert(res.body.email === userProps.email)
        done()
      })
  })
})

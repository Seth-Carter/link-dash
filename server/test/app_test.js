const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('The express app', () => {
  it('handles a simple GET request to /api/greeting', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        assert(res.body.message === "What's up, man?")
        done()
      })
  })
})

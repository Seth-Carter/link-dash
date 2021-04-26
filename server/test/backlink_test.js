const assert = require('assert')
const request = require('supertest')
const Backlink = require('../models/backlink')
const app = require('../app')

// Need to refactor this test to use 'beforeEach' instead of chaining supertest requests

describe('The backlink route', () => {
  const backlinkProps = {
    vendor: 'Linkstop',
    orderStatus: 'pending',
    dateOrdered: new Date().toISOString(),
    contentLanguage: 'EN',
    anchor: 'this is an anchor',
    targetUrl: 'www.coolsite.com',
    backlinkUrl: 'www.pbnlinks.com',
    price: 113.45,
    currency: 'GBP'
  }

  it('adds a backlink', (done) => {
    request(app)
      .post('/api/backlink/new')
      .send(backlinkProps)
      .end((err, res) => {
        assert(res.body.vendor === 'Linkstop')
        done()
      })
  })

  it('deletes a backlink', (done) => {
    //TODO
    done()
  })
})
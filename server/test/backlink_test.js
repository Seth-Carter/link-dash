const assert = require('assert')
const request = require('supertest')
const Backlink = require('../models/backlink')
const app = require('../app')

describe('The backlink route', () => {
  const backlinkProps = {
    vendor: 'Linkstop',
    orderStatus: 'pending',
    dateOrdered: '2021-04-22T19:37:27+0000',
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
})
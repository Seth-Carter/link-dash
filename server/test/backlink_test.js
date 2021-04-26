const assert = require('assert')
const request = require('supertest')
const Backlink = require('../models/backlink')
const app = require('../app')

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
    const backlink1 = new Backlink({ ...backlinkProps, targetUrl: 'www.backlink1.com' }) 
    const backlink2 = new Backlink({ ...backlinkProps, targetUrl: 'www.backlink2.com' }) 
    const backlink3 = new Backlink({ ...backlinkProps, targetUrl: 'www.backlink3.com' })

    let idArray = {
      _idArray: []
    }

    Promise.all([backlink1.save(), backlink2.save(), backlink3.save()])
      .then((res) => {
        
        res.forEach((record) => {
          idArray._idArray.push(record._id)
        })
        
        request(app)
          .post('/api/backlink/delete')
          .send(idArray)
          .end((err, res) => {
            assert(res.body.ok === 1)
            done()
          })
      })
      .catch((err) => {
        console.warn(err)
        done()
      })
  })
})
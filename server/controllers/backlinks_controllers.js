const Backlink = require('../models/backlink')

module.exports = {
  
  createBacklink(req, res) {
    const backlink = new Backlink({
      vendor: req.body.vendor,
      orderStatus: req.body.orderStatus,
      dateOrdered: req.body.dateOrdered,
      contentLanguage: req.body.contentLanguage,
      anchor: req.body.anchor,
      targetUrl: req.body.targetUrl,
      backlinkUrl: req.body.backlinkUrl,
      price: req.body.price,
      currency: req.body.currency
    })
    backlink.save()
    .then(newBacklink => res.send(newBacklink))
    .catch((err) => res.status(422).send({ error: err.message }))
  },

  editBacklink(req, res) {

  },

  fetchBacklinks(req, res) {
    Backlink.find({})
      .then((backlinks) => {
        res.send(backlinks)
      })
      .catch((err) => res.status(422).send({ error: err.message}))
  }
}

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
    //TODO
  },

  fetchBacklinks(req, res) {
    const { page = 0, limit = 10 } = req.query
    const payload = {}

    Backlink.find({})
      .limit(limit * 1)
      .skip(page * limit)
      .then((backlinks) => {
        payload.backlinks = backlinks
        return Backlink.countDocuments()
      })
      .then((count) => {
        payload.totalDocuments = count,
        payload.currentPage = parseInt(page, 10)
        res.send(payload)
      })
      .catch((err) => res.status(422).send({ error: err.message}))
  },
  
  deleteBacklinks(req, res) {
    Backlink.deleteMany(
      { 
        _id: {
          $in: req.body._idArray
    }})
    .then((data) => res.send(data))
    .catch((err) => res.status(422).send({error: err.message}))
  }
}

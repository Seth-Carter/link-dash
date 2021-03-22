const mongoose = require('mongoose')
const { Schema } = mongoose

const BacklinkSchema = new Schema({
  vendor: String,
  orderStatus: String,
  dateOrdered: Date,
  contentLanguage: String,
  anchor: String,
  targetUrl: String,
  backlinkUrl: String,
  price: {
    type: mongoose.Decimal128,
    set: i => mongoose.Types.Decimal128.fromString(i.toFixed(2)),
    default: 0
  },
  currency: {
    type: String,
    match: [
      /^[A-Z]{3}$/,
      'Please input a valid ISO 4217 currency code.'
    ]
  }
})

const Backlink = mongoose.model('backlink', BacklinkSchema)
module.exports = Backlink
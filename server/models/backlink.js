const mongoose = require('mongoose')
const { Schema } = mongoose

const BacklinkSchema = new Schema({
  vendor: {
    type: String,
    default: 'No Vendor'
  },
  orderStatus: {
    type: String,
    required: true
  },
  dateOrdered: {
    type: Date,
    required: true,
    // default: Date.now
  },
  contentLanguage: {
    type: String,
    required: true
  },
  anchor: String,
  targetUrl: {
    type: String,
    match: [
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      'Please input a valid URL.'
    ],
    required: true
  },
  backlinkUrl: {
    type: String,
    match: [
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      'Please input a valid URL.'
    ],
    required: true
  },
  price: {
    type: mongoose.Decimal128,
    set: (i) => mongoose.Types.Decimal128.fromString(i.toFixed(2)),
    default: 0
  },
  currency: {
    type: String,
    match: [/^[A-Z]{3}$/, 'Please input a valid ISO 4217 currency code.']
  }
})

const Backlink = mongoose.model('backlink', BacklinkSchema)
module.exports = Backlink

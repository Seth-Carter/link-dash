const mongoose = require('mongoose')
const { Schema } = mongoose

const BacklinkSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'vendor'
  },
  orderStatus: String,
  dateOrdered: Date,
  contentLanguage: String,
  anchor: String,
  targetUrl: String,
  backlinkUrl: String,
  keyword: String,
  price: Number,
  currency: String
})

const Backlink = mongoose.model('backlink', BacklinkSchema)
module.exports = Backlink
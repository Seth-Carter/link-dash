const mongoose = require('mongoose')
const { Schema } = mongoose

const VendorSchema = new Schema({
  name: String,
  email: String,
  domains: [
    {
      type: String
    }
  ]
})

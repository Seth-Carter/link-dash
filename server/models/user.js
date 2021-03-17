const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    minlength: 5,
    maxlength: 255,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      'Please input a valid email address.'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
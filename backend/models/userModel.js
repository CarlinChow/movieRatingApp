const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String, 
    required: [true, 'please add a email'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'please add a username'],
  },
  password: {
    type: String,
    required: [true, 'please add a password'],
  }
}, {
  timestamp: true,
})

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    // minlength: 3,
    // maxlength: 30
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    // lowercase: true,
    // match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    // match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits']
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
    // maxlength: 128
  },
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);
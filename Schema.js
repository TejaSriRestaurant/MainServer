const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
  },
  totalStars: {
    type: Number,
    required: true
  },
  numFeedback: {
    type: Number,
    required: true
  }
  
});

// Create a model for the User schema
const User = mongoose.model('tejasris', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
});

module.exports = mongoose.model('User', userSchema);

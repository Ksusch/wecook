const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  image: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  about: String,
  image: String,
  facebookId: String,
  googleId: String,
  twitterId: String,
  confirmationToken: String,
  active: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;

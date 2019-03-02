const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  image: String,
  status: {
    confirmationToken: "",
    active: false // this one is used for email confirmation etc. 
  },
  facebookId: String,
  googleId: String,
  twitterId: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

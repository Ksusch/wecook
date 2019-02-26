const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  offerings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offerings'
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  orders: Number,
  availability: String,
  ingredients: Array,
  category: String,
  delivery: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
});

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;

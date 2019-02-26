const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  orders: Number,
  availability: String,
  ingredients: Array,
  category: String,
  image: String,
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
  ]
});

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;

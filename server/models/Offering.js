const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  orders: Number,
  fromDate: Date,
  toDate: Date,
  ingredients: Array,
  category: String,
  delivery: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
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

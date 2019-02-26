const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  title: String,
  content: String,
  offering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offering'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  locations: String,
  image: String,  
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
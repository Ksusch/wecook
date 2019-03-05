const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
	name: String,
	animal: String,
	description: String,
	image: String,  
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
	name: { type: String, required: true },
	animal: { type: String, required: true },
	description: { type: String, required: false },
	image: { type: String, required: false },  
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
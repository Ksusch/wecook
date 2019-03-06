const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: {  type: String, required: true },
	image: {  type: String, required: false },
	location: {
		address: { type: String, required: true },
		coordinates: { type: [Number], required: true },
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'User',
		},
	],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

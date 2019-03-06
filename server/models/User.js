const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	email: { type: String, required: false },
	password: { type: String, required: false },
	name: { type: String, required: true },
	about: { type: String, required: false },
	image: { type: String, required: false },
	facebookId: { type: String, required: false },
	googleId: { type: String, required: false },
	twitterId: { type: String, required: false },
	confirmationToken: { type: String, required: false },
	active: { type: Boolean, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

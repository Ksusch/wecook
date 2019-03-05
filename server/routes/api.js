const express = require('express');
const router = express.Router();
const { isActiveUser } = require('../src/middlewares');
const Pet = require('../models/Pet');
const User = require('../models/User');
const Event = require('../models/Event');

// User CRUD

router.put('/user', isActiveUser, (req, res, next) => {
	let data = {};
	if (req.body.image) data.image = req.body.image;
	if (req.body.name) data.name = req.body.name;
	if (req.body.about) data.about = req.body.about;
	User.findOneAndUpdate(
		{
			$or: [
				{ _id: req.user.id },
				{ googleId: req.user.id },
				{ twitterId: req.user.id },
				{ facebookId: req.user.id },
			],
		},
		data,
		{ new: true }
	)
		.then(user => {
			let userData = user;
			userData.password = undefined;
			res.status(200).json(userData);
		})
		.catch(err => console.error(err));
});

// Event CRUD

router.get('/event', isActiveUser, (req, res, next) => {
	// TODO get only events from this user
	User.findOne({
		$or: [
			{ _id: req.user.id },
			{ googleId: req.user.id },
			{ twitterId: req.user.id },
			{ facebookId: req.user.id },
		],
	})
		.then(user => Event.find({ owner: user._id }))
		.then(events => res.status(200).json(events))
		.catch(err => console.error(err));
});

router.get('/event', isActiveUser, (req, res, next) => {
	// TODO get only pets from this user
	User.findOne({
		$or: [
			{ _id: req.user.id },
			{ googleId: req.user.id },
			{ twitterId: req.user.id },
			{ facebookId: req.user.id },
		],
	})
		.then(user => Event.find({ owner: user._id }))
		.then(event => res.status(200).json(event))
		.catch(err => console.error(err));
});

router.post('/event', isActiveUser, (req, res, next) => {
	User.findOne({
		$or: [
			{ _id: req.user.id },
			{ googleId: req.user.id },
			{ twitterId: req.user.id },
			{ facebookId: req.user.id },
		],
	})
		.then(user =>
			Event.create({
				name: req.body.name,
				location: req.body.location,
				description: req.body.description,
				image: req.body.image,
				owner: user._id,
			})
		)
		.then(event => res.status(200).json(event))
		.catch(err => console.error(err));
});

router.put('/event/:id', isActiveUser, (req, res, next) => {
	let eventData = {};
	if (req.body.name) eventData.name = req.body.name;
	if (req.body.location) eventData.location = req.body.location;
	if (req.body.description) eventData.description = req.body.description;
	if (req.body.image) eventData.image = req.body.image;
	Event.findOneAndUpdate(
		{ _id: req.params.id },
		eventData,
		{new: true}
	)
		.then(event => res.status(200).json(event))
		.catch(err => console.error(err));
});

router.delete('/event/:id', isActiveUser, (req, res, next) => {
	Event.findOneAndDelete({ _id: req.params.id })
		.then(event => res.status(200).json(event))
		.catch(err => console.error(err));
});

// Pet CRUD

router.get('/pet', isActiveUser, (req, res, next) => {
	// TODO get only pets from this user
	User.findOne({
		$or: [
			{ _id: req.user.id },
			{ googleId: req.user.id },
			{ twitterId: req.user.id },
			{ facebookId: req.user.id },
		],
	})
		.then(user => Pet.find({ owner: user._id }))
		.then(pets => res.status(200).json(pets))
		.catch(err => console.error(err));
});

router.post('/pet', isActiveUser, (req, res, next) => {
	User.findOne({
		$or: [
			{ _id: req.user.id },
			{ googleId: req.user.id },
			{ twitterId: req.user.id },
			{ facebookId: req.user.id },
		],
	})
		.then(user =>
			Pet.create({
				name: req.body.name,
				animal: req.body.animal,
				description: req.body.description,
				image: req.body.image,
				owner: user._id,
			})
		)
		.then(pet => res.status(200).json(pet))
		.catch(err => console.error(err));
});

router.put('/pet/:id', isActiveUser, (req, res, next) => {
	let petData = {};
	if (req.body.name) petData.name = req.body.name;
	if (req.body.animal) petData.animal = req.body.animal;
	if (req.body.description) petData.description = req.body.description;
	if (req.body.image) petData.image = req.body.image;
	Pet.findOneAndUpdate({ _id: req.params.id }, petData, { new: true })
		.then(pet => res.status(200).json(pet))
		.catch(err => console.error(err));
});

router.delete('/pet/:id', isActiveUser, (req, res, next) => {
	Pet.findOneAndDelete({ _id: req.params.id })
		.then(() => res.status(200).json({ message: 'deleted' }))
		.catch(err => console.error(err));
});

// add image

router.post('/image/add', isActiveUser, (req, res, next) => {
	if (req.body.type === 'User') {
		User.findOneAndUpdate(
			{
				$or: [
					{ _id: req.user.id },
					{ googleId: req.user.id },
					{ twitterId: req.user.id },
					{ facebookId: req.user.id },
				],
			},
			{
				image: req.body.imageUrl,
			}
		)
			.then(user => {
				let userData = user;
				userData.password = undefined;
				res.status(200).json(userData);
			})
			.catch(err => console.error(err));
	} else {
		Pet.findOneAndUpdate({ _id: req.body.id }, { image: req.body.imageUrl })
			.then(pet => res.status(200).json(pet))
			.catch(err => console.error(err));
	}
});

module.exports = router;

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
	User.findOneAndUpdate({ _id: req.user.id }, data, { new: true })
		.then(user => {
			let userData = user;
			userData.password = undefined;
			res.status(200).json(userData);
		})
		.catch(err => console.error(err));
});

// Event CRUD

router.get('/events', isActiveUser, (req, res, next) => {
	User.findOne({ _id: req.user.id })
		.then(user => Event.find({ owner: user._id }))
		.then(events => res.status(200).json(events))
		.catch(err => console.error(err));
});

router.get('/allevents', isActiveUser, (req, res, next) => {
	// { owner: { $ne: req.user.id } }
	Event.find()
		.then(events => res.status(200).json(events))
		.catch(err => console.error(err));
});

router.post('/events', isActiveUser, (req, res, next) => {
	User.findOne({ _id: req.user.id })
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

router.put('/events/:id', isActiveUser, (req, res, next) => {
	let eventData = {};
	if (req.body.name) eventData.name = req.body.name;
	if (req.body.location) eventData.location = req.body.location;
	if (req.body.description) eventData.description = req.body.description;
	if (req.body.image) eventData.image = req.body.image;
	Event.findOneAndUpdate({ _id: req.params.id }, eventData, { new: true })
		.then(event => res.status(200).json(event))
		.catch(err => console.error(err));
});

router.delete('/events/:id', isActiveUser, (req, res, next) => {
	Event.findOneAndDelete({ _id: req.params.id })
		.then(event => res.status(200).json(event))
		.catch(err => console.error(err));
});

// event participant CRUD

router.get('/participants/:id', isActiveUser, (req, res, next) => {
	Event.findOne({ _id: req.params.id })
		.populate('owner')
		.populate('participants')
		.then(result => {
			let participants = result.data.participants.map(v => ({
					name: v.name,
					image: v.image,
				})),
				owner = {
					name: result.data.owner.name,
					image: result.data.owner.image,
				},
				ownerCurrent = result.owner._id === req.user.id ? true : false;

			res.status(200).json({
				participants: participants,
				owner: owner,
				ownerCurrent: ownerCurrent,
			});
		})
		.catch(err => console.error(err));
});

router.post('/participants', isActiveUser, (req, res, next) => {
	Event.findOneAndUpdate(
		{ _id: req.params.id },
		{ $push: { participants: req.user.id } },
		{ new: true }
	)
		.then(participant => res.status(200).json(participant))
		.catch(err => console.error(err));
});

router.delete('/participants', isActiveUser, (req, res, next) => {
	Event.findOneAndUpdate(
		{ _id: req.params.id },
		{ $pull: { participants: req.user.id } },
		{ new: true }
	)
		.then(participant => res.status(200).json(participant))
		.catch(err => console.error(err));
});

// Pet CRUD

router.get('/pets', isActiveUser, (req, res, next) => {
	// TODO get only pets from this user
	User.findOne({ _id: req.user.id })
		.then(user => Pet.find({ owner: user._id }))
		.then(pets => res.status(200).json(pets))
		.catch(err => console.error(err));
});

router.post('/pets', isActiveUser, (req, res, next) => {
	User.findOne({ _id: req.user.id })
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

router.put('/pets/:id', isActiveUser, (req, res, next) => {
	let petData = {};
	if (req.body.name) petData.name = req.body.name;
	if (req.body.animal) petData.animal = req.body.animal;
	if (req.body.description) petData.description = req.body.description;
	if (req.body.image) petData.image = req.body.image;
	Pet.findOneAndUpdate({ _id: req.params.id }, petData, { new: true })
		.then(pet => res.status(200).json(pet))
		.catch(err => console.error(err));
});

router.delete('/pets/:id', isActiveUser, (req, res, next) => {
	Pet.findOneAndDelete({ _id: req.params.id })
		.then(() => res.status(200).json({ message: 'deleted' }))
		.catch(err => console.error(err));
});

// add image

router.post('/image', isActiveUser, (req, res, next) => {
	if (req.body.type === 'User') {
		User.findOneAndUpdate(
			{ _id: req.user.id },
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

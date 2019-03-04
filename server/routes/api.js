const express = require("express");
const router = express.Router();
const { isActiveUser } = require("../src/middlewares");
const Pet = require("../models/Pet");
const User = require("../models/User");
const Event = require("../models/Event");

// User CRUD

router.put("/user", isActiveUser, (req, res, next) => {
  console.log("request received", req.body);
  let data = {}
  if (req.body.image) data.image = req.body.image
  if (req.body.name) data.name = req.body.name
  if (req.body.about) data.about = req.body.about
  console.log("data", data)
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
			console.log("user updated", user);
			let userData = user;
			userData.password = undefined;
			res.status(200).json(userData);
		})
		.catch(err => console.log(err));
});

// Event CRUD

router.get("/event", isActiveUser, (req, res, next) => {
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
		.catch(err => console.log(err));
});

router.get("/allevents", isActiveUser, (req, res, next) => {
	// TODO get only events from this user
	User.findOne({
		$or: [
			{ _id: req.user.id },
			{ googleId: req.user.id },
			{ twitterId: req.user.id },
			{ facebookId: req.user.id },
		],
	})
		.then(user => Event.find({ $ne: { owner: user._id } }))
		.then(events => res.status(200).json(events))
		.catch(err => console.log(err));
});

router.post("/event", isActiveUser, (req, res, next) => {
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
		.catch(err => console.log(err));
});

router.put("/event/:id", isActiveUser, (req, res, next) => {
	Event.findOneAndUpdate(
		{ _id: req.params.id },
		{
			name: req.body.name,
			location: req.body.location,
			description: req.body.description,
			image: req.body.image,
		}
	)
		.then(event => res.status(200).json(event))
		.catch(err => console.log(err));
});

router.delete("/event/:id", isActiveUser, (req, res, next) => {
	Event.findOneAndDelete({ _id: req.params.id })
		.then(event => res.status(200).json(event))
		.catch(err => console.log(err));
});

// Pet CRUD

router.get("/pet", isActiveUser, (req, res, next) => {
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
		.catch(err => console.log(err));
});

router.post("/pet", isActiveUser, (req, res, next) => {
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
		.catch(err => console.log(err));
});

router.put("/pet/:id", isActiveUser, (req, res, next) => {
	Pet.findOneAndUpdate(
		{ _id: req.params.id },
		{
			name: req.body.name,
			animal: req.body.animal,
			description: req.body.description,
			image: req.body.image,
		}
	)
		.then(pet => res.status(200).json(pet))
		.catch(err => console.log(err));
});

router.delete("/pet/:id", isActiveUser, (req, res, next) => {
	Pet.findOneAndDelete({ _id: req.params.id })
		.then(pet => res.status(200).json(pet))
		.catch(err => console.log(err));
});

// add image

router.post("/image/add", isActiveUser, (req, res, next) => {
	console.log(
		"I am trying to update the user photo",
		req.body.imageUrl,
		req.user
	);
	if (req.body.type === "User") {
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
				console.log("I have updated the user photo", user);
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

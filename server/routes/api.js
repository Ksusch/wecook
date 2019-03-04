const express = require("express");
const router = express.Router();
const { isActiveUser } = require("../src/middlewares");
const Pet = require("../models/Pet");
const User = require("../models/User");
const Event = require("../models/Event");

// User CRUD

router.put("/user", isActiveUser, (req, res, next) => {
	User.findOneAndUpdate(
		{
			$or: [
				{ _id: id },
				{ googleId: id },
				{ twitterId: id },
				{ facebookId: id },
			],
		},
		{
			name: req.body.name,
			about: req.body.about,
		}
	)
		.then(user => {
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
      { _id: id },
      { googleId: id },
      { twitterId: id },
      { facebookId: id },
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
      { _id: id },
      { googleId: id },
      { twitterId: id },
      { facebookId: id },
    ],
  })
  .then(user => Event.find({ $ne: {owner: user._id }}))
	.then(events => res.status(200).json(events))
	.catch(err => console.log(err));
});

router.post("/event", isActiveUser, (req, res, next) => {
  User.findOne({
    $or: [
      { _id: id },
      { googleId: id },
      { twitterId: id },
      { facebookId: id },
    ],
  })
  .then(user => Event.create({
		name: req.body.name,
		location: req.body.location,
		description: req.body.description,
		image: req.body.image,
		owner: user._id,
	}))
	.then(event => res.status(200).json(event))
	.catch(err => console.log(err))
  
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
      { _id: id },
      { googleId: id },
      { twitterId: id },
      { facebookId: id },
    ],
  })
  .then(user => Pet.find({ owner: user._id }))
	.then(pets => res.status(200).json(pets))
	.catch(err => console.log(err));
});

router.post("/pet", isActiveUser, (req, res, next) => {
  User.findOne({
    $or: [
      { _id: id },
      { googleId: id },
      { twitterId: id },
      { facebookId: id },
    ],
  })
  .then(user => Pet.create({
		name: req.body.name,
		animal: req.body.animal,
		description: req.body.description,
		image: req.body.image,
		owner: user._id,
	}))
	.then(pet => res.status(200).json(pet))
	.catch(err => console.log(err))
  
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

module.exports = router;

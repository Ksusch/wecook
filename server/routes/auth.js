const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("../src/nodemailer");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({
			message: "Email address and password are both required",
		});
		return;
	}
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user !== null) {
				res.status(409).json({
					message: "This email address is already in use",
				});
				return;
			}
			let token =
				Math.random()
					.toString(36)
					.substr(2) +
				Math.random()
					.toString(36)
					.substr(2);
			return User.create({
				email: req.body.email,
				password: bcrypt.hashSync(
					req.body.password,
					bcrypt.genSaltSync(bcryptSalt)
				),
				address: req.body.address,
				name: req.body.name,
				status: {
					confirmationToken: token,
					active: false, // this one is used for email confirmation etc.
				},
			});
		})
		.then(createdUser => {
			req.logIn(createdUser, () => {
				createdUser.password = undefined;
				res.json(createdUser);
			});
			nodemailer.createEmail(
				process.env.GMAIL_USER,
				req.body.email,
				"Confirm your email",
				`Please confirm your email by proceeding to the following link: ${
					process.env.SERVER_ADDRESS
				}${process.env.PORT}/auth/confirm/${
					createdUser.status.confirmationToken
				}`
			);
		})
		.catch(err => next(err));
});

router.get("/confirm/:confirmationToken", (req, res, next) => {
	User.findOneAndUpdate(
		{ "status.confirmationToken": req.params.confirmationToken },
		{ status: {$elemMatch: {active: true }}}
	)
	.then(user => console.log("User email confirmed!", user))
	.catch(err => next(err));
});

router.post("/login", (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				next(new Error("Incorrect email "));
				return;
			}
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				next(new Error("Password is wrong"));
				return;
			}
			if (!user.status.active) {
				next(new Error("User email not confirmed"));
				return;
			}
			req.logIn(user, () => {
				user.password = undefined;
				res.json(user);
			});
		})
		.catch(err => next(err));
});

router.post("/login-with-passport-local-strategy", (req, res, next) => {
	passport.authenticate("local", (err, user, failureDetails) => {
		if (err) {
			res.status(500).json({ message: "Something went wrong" });
			return;
		}
		if (!user) {
			res.status(401).json(failureDetails);
			return;
		}
		req.login(user, err => {
			if (err) {
				res.status(500).json({ message: "Something went wrong" });
				return;
			}
			res.json(req.user);
		});
	})(req, res, next);
});

router.get("/logout", (req, res) => {
	req.logout();
	res.json({ message: "You are out!" });
});

module.exports = router;

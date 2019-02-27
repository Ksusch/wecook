const express = require("express")
const passport = require('passport')
const router = express.Router()
const User = require("../models/User")
const nodemailer = require("../src/nodemailer")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.post("/signup", (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({ message: "Indicate username and password" })
		return
	}
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user !== null) {
				res.status(409).json({ message: "The username already exists" })
				return
			}
			return User.create({
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSalt)),
				address: req.body.address,
				name: req.body.name
			})
		})
		.then(createdUser => {
			req.logIn(createdUser, () => {
				createdUser.password = undefined;
				res.json(createdUser);
			});
			nodemailer.createEmail(process.env.GMAIL_USER, req.body.email, "Confirm your email", "Please confirm your email by pressing the following link")
		})
		.catch(err => next(err))
})

router.post("/login", (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				next(new Error("Incorrect username "))
				return
			}
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				next(new Error("Password is wrong"))
				return
			}
			req.logIn(user, () => {
				user.password = undefined
				res.json(user)
			})
		})
		.catch(err => next(err))
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
		if (err) {
			res.status(500).json({ message: 'Something went wrong' })
			return
		}

		if (!theUser) {
			res.status(401).json(failureDetails)
			return
		}

		req.login(theUser, (err) => {
			if (err) {
				res.status(500).json({ message: 'Something went wrong' })
				return
			}

			// We are now logged in (notice req.user)
			res.json(req.user)
		})
	})(req, res, next)
})

router.get("/logout", (req, res) => {
	req.logout()
	res.json({ message: 'You are out!' })
})

module.exports = router
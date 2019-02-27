<<<<<<< HEAD
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
=======
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
>>>>>>> 71cd74c810097c0b69cf6af468224ca8dc14b55b

passport.serializeUser((loggedInUser, cb) => {
	cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
	User.findById(userIdFromSession)
		.then(userDocument => {
			cb(null, userDocument);
		})
		.catch(err => {
			cb(err);
		});
});

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		(email, password, done) => {
			User.findOne({ email })
				.then(foundUser => {
					if (!foundUser) {
						done(null, false, { message: "Incorrect username" });
						return;
					}

					if (!bcrypt.compareSync(password, foundUser.password)) {
						done(null, false, { message: "Incorrect password" });
						return;
					}

					done(null, foundUser);
				})
				.catch(err => done(err));
		}
	)
);

module.exports = app => {
	app.use(passport.initialize());
	app.use(passport.session());
};

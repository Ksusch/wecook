const express = require("express"),
	passport = require("passport"),
	router = express.Router(),
	User = require("../models/User"),
	nodemailer = require("../src/nodemailer"),
	bcrypt = require("bcrypt"),
	bcryptSalt = 10,
	app = require("../src/app")
	twitterAuth = passport.authenticate("twitter"),
	googleAuth = passport.authenticate("google", { scope: ["profile"] }),
	facebookAuth = passport.authenticate("facebook"),
	{ addSocketIdtoSession } = require("../src/middlewares");

router.post("/signup", (req, res, next) => {
	if (!req.body.email || !req.body.password) { //TODO: Move this to the frontend!
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
		{ status: { $elemMatch: { active: true } } }
	)
		.then(user => console.log("User email confirmed!", user))
		.catch(err => next(err));
});

router.post("/login", (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (
				!user ||
				!bcrypt.compareSync(req.body.password, user.password) ||
				!user.status.active
			) {
				if (!user) {
					res.json({ message: "Email address not found" });
				} else if (
					!bcrypt.compareSync(req.body.password, user.password)
				) {
					res.json({ message: "Incorrect password" });
				} else {
					res.json({ message: "User email not confirmed" });
				}
			} else {
				req.logIn(user, () => {
					user.password = undefined;
					res.json(user);
				});
			}
		})
		.catch(err => next(err));
});

router.post("/login-with-passport-local-strategy", (req, res, next) => {
	console.log("this part fired");
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

//OAuth paths

router.get('/twitter', addSocketIdtoSession, twitterAuth)
router.get('/google', addSocketIdtoSession, googleAuth)
router.get('/facebook', addSocketIdtoSession, facebookAuth)

// callback routes -- these must correlate with the ones defined in each API
router.get('/twitter/callback', twitterAuth, (req, res, next) => {
	const io =  req.app.get("io")//req.app.get("io");
	const user = {
		name: req.user.username,
		photo: req.user.photos[0].value.replace(/_normal/, ""),
	};
	io.in(req.session.socketId).emit("twitter", user);
})
router.get('/google/callback', googleAuth, (req, res, next) => {
	const io = req.app.get("io");
	const user = {
		name: req.user.displayName,
		photo: req.user.photos[0].value.replace(/sz=50/gi, "sz=250"),
	};
	io.in(req.session.socketId).emit("google", user);
})
router.get('/facebook/callback', facebookAuth, (req, res, next) => {
	const io = req.app.get("io");
	const { givenName, familyName } = req.user.name;
	const user = {
		name: `${givenName} ${familyName}`,
		photo: req.user.photos[0].value,
	};
	io.in(req.session.socketId).emit("facebook", user);
})

//logout - same for all variations

router.get("/logout", (req, res) => {
	req.logout();
	res.json({ message: "Log out" });
});

module.exports = router;

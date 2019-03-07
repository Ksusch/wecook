const express = require('express'),
	passport = require('passport'),
	router = express.Router(),
	bcrypt = require('bcrypt'),
	nodemailer = require('../src/nodemailer'),
	app = require('../src/app'),
	User = require('../models/User'),
	{ addSocketIdtoSession } = require('../src/middlewares'),
	twitterAuth = passport.authenticate('twitter'),
	googleAuth = passport.authenticate('google', { scope: ['profile'] }),
	facebookAuth = passport.authenticate('facebook'),
	localAuth = passport.authenticate('local');
	
router.post('/signup', (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({
			message: 'Email address and password are both required'
		});
		return;
	}
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				res.status(409).json({
					message: 'This email address is already registered with the server.'
				});
				return;
			}
			let token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
			return User.create({
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
				name: req.body.name,
				confirmationToken: token,
				active: false
			});
		})
		.then(user => {
			req.login(user, err => {
				if (err) {
					console.error('Server Error', err);
				} else
					res.status(200).json({
						message: 'A confirmation email has been sent to your mailbox'
					});
				nodemailer.createEmail(
					process.env.GMAIL_USER,
					req.body.email,
					'Confirm your email',
					`Please confirm your email by proceeding to the following link: ${
						process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://wepetevents.herokuapp.com' 
					}3000/confirm/${user.confirmationToken}`
				);
			});
		})
		.catch(err => next(err));
});

router.post('/confirm', (req, res) => {
	User.findOneAndUpdate(
		{ confirmationToken: req.body.token },
		{ $set: { active: true } }
	)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(() =>
			res.status(401).json({
				message: 'Invalid confirmation token'
			})
		);
});

router.post('/login', localAuth, (req, res) => {
	if (req.user.active) {
		let user = req.user;
		user.password = undefined;
		res.status(200).json(user);
	} else {
		res.status(403);
	}
});

router.get('/verifyAuthentication', (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).json({
			message: 'User authenticated'
		});
	} else {
		res.status(403).json({
			message: 'Unauthorized'
		});
	}
});
//OAuth paths

router.get('/twitter', addSocketIdtoSession, twitterAuth);
router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/facebook', addSocketIdtoSession, facebookAuth);

// callback routes -- these must correlate with the ones defined in each API
router.get('/twitter/callback', twitterAuth, req => {
	let user = req.user;
	user.password = undefined;
	app
		.get('io')
		.in(req.session.socketId)
		.emit('twitter', user);
});
router.get('/google/callback', googleAuth, req => {
	let user = req.user;
	user.password = undefined;
	app
		.get('io')
		.in(req.session.socketId)
		.emit('google', user);
});
router.get('/facebook/callback', facebookAuth, req => {
	let user = req.user;
	user.password = undefined;
	app
		.get('io')
		.in(req.session.socketId)
		.emit('facebook', user);
});

//logout - same for all variations

router.get('/logout', (req, res) => {
	req.logout();
	res.json({ message: 'Log out' });
});

module.exports = router;

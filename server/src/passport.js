const passport = require("passport"),
	User = require("../models/User"),
	bcrypt = require("bcrypt"),
	{ Strategy: LocalStrategy } = require("passport-local"),
	{ Strategy: TwitterStrategy } = require("passport-twitter"),
	{ OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth"),
	{ Strategy: FacebookStrategy } = require("passport-facebook");

module.exports = () => {
	passport.serializeUser((user, cb) => cb(null, user.id));

	passport.deserializeUser((id, cb) => {
		console.log("deserializer fired", id);
		User.findOne(
			{
				$or: [
					{ _id: id },
					{ googleId: id },
					{ twitterId: id },
					{ facebookId: id },
				],
			},
			function(err, user) {
				console.log("got to deserializer callback");
				console.log(user);
				if (err) {
					return cb(err);
				}
				cb(null, user);
			}
		);
	});
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			authCB("local")
		)
	);
	passport.use(
		new TwitterStrategy(
			{
				consumerKey: process.env.TWITTER_CONSUMER_KEY,
				consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
				callbackURL: process.env.TWITTER_CALLBACK_URL,
			},
			authCB("twitter")
		)
	);
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_APP_ID,
				clientSecret: process.env.GOOGLE_APP_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK_URL,
			},
			authCB("google")
		)
	);
	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
				callbackURL: process.env.FACEBOOK_CALLBACK_URL,
				profileFields: ["id", "displayName", "picture", "email"],
			},
			authCB("facebook")
		)
	);
	function authCB(origin) {
		if (origin !== "local") {
			let ID = origin + "Id";
			return (accessToken, refreshToken, profile, done) => {
				console.log("got to auth callback function, passport.js")
				User.findOne({ [ID]: profile.id })
					.then(user => {
						if (!user) {
							let name, image;
							switch (origin) {
								case "google":
									image = profile.photos[0].value.replace(
										/sz=50/gi,
										"sz=250"
									);
									name = profile.displayName;
									break;
								case "facebook":
									image = profile.photos[0].value;
									name = Object.values(profile.name).join(
										" "
									);
									break;
								case "twitter":
									image = profile.photos[0].value.replace(
										/_normal/,
										""
									);
									name = profile.username;
							}
							User.create({
								name: name,
								image: image,
								status: {
									confirmationToken: null,
									active: true,
								},
								[ID]: profile.id,
							})
								.then(user => done(null, user))
								.catch(err => done(err));
						} else {
							return done(null, user);
						}
					})
					.catch(err => done(err));
			};
		} else {
			return (username, password, cb) => {
				User.findOne({ email: username }, function(err, user) {
					if (err) {
						return cb(err);
					}
					if (!user) {
						return cb(null, false);
					}
					if (!bcrypt.compareSync(password, user.password)) {
						return cb(null, false);
					}
					return cb(null, user);
				});
			};
		}
	}
};

const passport = require("passport"),
	User = require("../models/User"),
	bcrypt = require("bcrypt"),
	{ Strategy: LocalStrategy } = require("passport-local"),
	{ Strategy: TwitterStrategy } = require("passport-twitter"),
	{ OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth"),
	{ Strategy: FacebookStrategy } = require("passport-facebook");

module.exports = () => {
	passport.serializeUser((loggedInUser, cb) => {
		console.log("serializer fired", loggedInUser, cb)
		cb(null, loggedInUser.id);
	});

	passport.deserializeUser((userIdFromSession, cb) => {
		console.log("deserializer fired", userIdFromSession)
		User.findOne( { twitterId: userIdFromSession } )
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
			return (accessToken, refreshToken, profile, cb) => {
				User.findOne({ [ID]: profile.id })
					.then(user => {
						let name, image;
						switch(origin){
							case "google": 
								image = profile.photos[0].value.replace(/sz=50/gi, "sz=250")
								name = profile.displayName
								break;
							case "facebook": 
								image = profile.photos[0].value
								name = Object.values(profile.name).join(" ")
								break;
							case "twitter": 
								image = profile.photos[0].value.replace(/_normal/, "")
								name = profile.username
						}
						
						
						if (!user) {
							console.log("I am creating a user", profile.id)
							User.create({
								name: name,
								image: image,
								status: {
									confirmationToken: null,
									active: true,
								},
								[ID]: profile.id,
							})
								.then(() => cb(null, profile))
								.catch(err => console.log(err));
						} else {
							return cb(null, profile);
						}
					})
					.catch(err => console.log(err));
			};
		} else {
			return (email, password, done) => {
				User.findOne({ email })
					.then(foundUser => {
						if (
							!foundUser ||
							!bcrypt.compareSync(password, foundUser.password)
						) {
							done(null, false, {
								message: "Incorrect email or password",
							});
						} else {
							done(null, foundUser);
						}
					})
					.catch(err => done(err));
			};
		}
	}
};

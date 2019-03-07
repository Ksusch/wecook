const bodyParser = require('body-parser'),
	cors = require('cors'),
	express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	passportInit = require('./passport'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	app = express(),
	path = require('path');

require('./db');
	
app.use(
	cors({
		origin: (origin, cb) => {
			cb(null, origin && origin.startsWith('http://localhost:'));
		},
		optionsSuccessStatus: 200,
		credentials: true,
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ 
			mongooseConnection: mongoose.connection 
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());
passportInit();
app.use(express.static(path.join(__dirname, '../../client/build')));
module.exports = app;

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, origin && origin.startsWith('http://localhost:'));
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//  app.use(express.static(path.join(_dirname,'../client/build')))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
require("./passport")(app)

app.use('/api', require('../routes/api'));
app.use('/auth', require('../routes/auth'));

module.exports = app;

require('dotenv').config();
const express = require('express'),
	path = require('path'),
	app = require('../src/app'),
	port = process.env.PORT ? process.env.PORT : 8080,
	server = require('http')
		.createServer(app)
		.listen(port, () => {
			console.log(`Listening on ${port}`);
		}),
	socketServer = require('socket.io'),
	io = new socketServer(server);
app.set('io', io);
require('../src/routing')(app);
app.use(express.static(path.join(__dirname, '../../client/build')));
io.on('connection', () => console.log('socket connected'));

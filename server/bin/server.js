require('dotenv').config();
const express = require('express');
const path = require('path');
const app = require('../src/app');
const server = require('http').createServer(app).listen(process.env.PORT || 8080, () => {
	console.log('Listening');
});
const socketServer = require('socket.io');
const io = new socketServer(server).origins('http://localhost:*');
app.set('io', io);
require('../src/routing')(app);
app.use(express.static(path.join(__dirname, '../../client/build')));
io.on('connection', () => console.log('socket connected'));


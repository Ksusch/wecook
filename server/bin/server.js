require('dotenv').config();
const app = require('../src/app');
const server = require('http').createServer(app).listen(process.env.PORT, () => {
	console.log(`Listening on ${process.env.SERVER_ADDRESS}${process.env.PORT}`);
});
const socketServer = require('socket.io');
const io = new socketServer(server).origins('http://localhost:*');
app.set('io', io);
app.use((req, res, next) => {
	res.sendFile(__dirname + '/public/index.html');
});
require('../src/routing')(app);
io.on('connection', () => console.log('socket connected'));


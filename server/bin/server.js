require('dotenv').config();
const http = require('http');
const app = require('../src/app');
const server = http.createServer(app);
const socket = require('socket.io');
var io = socket(server)
server.listen(process.env.PORT, () => {
  io = socket(server)
  app.set("io", io);
  console.log(`Listening on ${process.env.SERVER_ADDRESS}${process.env.PORT}`);
});
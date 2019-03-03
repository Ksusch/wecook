require('dotenv').config();
const app = require('../src/app');
const server = require('http').createServer(app).listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.SERVER_ADDRESS}${process.env.PORT}`);
});
const socketServer = require('socket.io');
const io = new socketServer(server).origins('http://localhost:*')
// io.on('connection', function(socket){
//   console.log('a user connected', socket);
// });
app.set("io", io);
require("../src/routing")(app)
io.on("connection", () => console.log("connection"))


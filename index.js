const Pacman = require('./dist');
const io = require('socket.io')();
io.on('connection', client => {
  // here you can start emitting events to the client
});
const port = 8080;
io.listen(port);
console.log('listening on port ', port);
console.log('what the ');
module.exports = Pacman;

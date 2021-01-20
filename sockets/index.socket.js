require('dotenv').config()
var jwt = require('socketio-jwt');
var roomService = require('../services/room.service');

const onconnect = (socket) => {

  socket.on ('login', (msg) => {
    console.log(msg);
  });

  socket.on ('init', (msg) => {
    const rooms = roomService.getRooms(msg.user_id);
    socket.emit('update_all', rooms);
  });

  socket.on('disconnect', function() {
    console.log('Disconnected');

    // var i = allClients.indexOf(socket);
    // allClients.splice(i, 1);
  });

  console.log('A new user connected');
}

const usesokcet = (io) => {
  io.use(jwt.authorize({
    secret: process.env.SECRET_KEY,
    handshake: true
  }));
  io.on('connection', onconnect);
}

module.exports = usesokcet;
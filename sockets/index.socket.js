
var roomService = require('../services/room.service');

const onconnect = (socket) => {

  socket.on ('login', (msg, func) => {
    console.log(msg);
    func(msg.token);
  });

  socket.on ('init', (msg) => {
    const rooms = roomService.getRooms(msg.user_id);
    socket.emit('update_all', rooms);
  });

  socket.on('disconnect', function() {
    console.log('A user disconnected');

    // var i = allClients.indexOf(socket);
    // allClients.splice(i, 1);
  });

  console.log('A new user connected');
}

const usesokcet = (io) => {
  io.on('connection', onconnect);
}

module.exports = usesokcet;
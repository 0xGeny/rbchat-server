
var Room = require('../models/room.model');

function getRooms(user_id) {
  const rooms = Room.find({ members: { user_id: user_id } });
  return rooms;
}

module.exports = {getRooms};
const mongoose = require('mongoose');
const Member = require('./member.model');
const Message = require('./message.model');

const RoomSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  room_name: { type: String, required: true },
  room_description: { type: String, required: true },
  members: [Member],
  messages: [Message]
});

module.exports = mongoose.model('room', RoomSchema);
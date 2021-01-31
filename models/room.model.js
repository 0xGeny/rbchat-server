const mongoose = require('mongoose');
const Member = require('./member.model');
const Message = require('./message.model');

const RoomSchema = new mongoose.Schema({
  room_name: { type: String, required: true },
  room_description: { type: String, required: false },
  room_type: { type: Number, required: true },
  members: [Member],
  messages: [Message],
}, {
  timestamps: true
});

module.exports = mongoose.model('room', RoomSchema);
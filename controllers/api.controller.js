require('dotenv').config()
var User = require('../models/user.model');
var Room = require('../models/room.model');

async function getAll(req, res) {
  const user_id = req.user.user_id;
  const users = await User.find({});
  const rooms = await Room.find({ members: { $elemMatch: { user_id: user_id } } }).exec();
  const me = users.find(user => user.user_id == user_id);
  res.status(200).json({users, rooms, me });
}

module.exports = {getAll};
require('dotenv').config()
var User = require('../models/user.model');
var Room = require('../models/room.model');
var userinfo = require('../utils/userinfo');
var rbapi = require('../utils/rbapi');

async function getAll(req, res) {
  const user_id = req.user.user_id;
  
  var users;
  try {
    users = await User.find({});
    //users = await rbapi.fetchUsers();
  }
  catch(error) {
    res.status(200).json({
      "message": "Can not access to the server."
    });
    return;
  }
  const rooms = await Room.find({ members: { $elemMatch: { user_id: user_id } } });
  const me = users.find(user => user.user_id == user_id);
  const uinfos = userinfo.getReducedInfos();
  
  res.status(200).json({users, rooms, me, uinfos});
}

module.exports = {getAll};

var Room = require('../models/room.model');

function addNewMessage(room_id, message) {
  return new Promise((resolve, reject) => {
    try {
      Room.findOneAndUpdate({ _id: room_id }, {$push: {messages: message}}, {new: true}, (err, room) => {
        if (err) reject(err);
        else resolve(room);
      });
    }
    catch(error) {
      reject(error);
    }
  })
}

function addNewRoom(room) {
  return new Promise((resolve, reject) => {
    try {
      if (room._id)
        delete room._id;
      Room.create(room, (err, new_room) => {
        if (err) reject(err);
        else resolve(new_room);
      })
    }
    catch(error) {
      reject(error);
    }
  })
}

function updateReadAt(room_id, user_id, time) {
  return new Promise((resolve, reject) => {
    try {
      Room.findOneAndUpdate({ _id: room_id, "members.user_id": user_id}, {$set: {"members.$.read_at": time}}, {new: true}, (err, room) => {
        if (err) reject(err);
        else resolve(room);
      });     
    }
    catch(error) {
      reject(error);
    }
  })
}

function getRoom(room_id) {
  return new Promise((resolve, reject) => {
    try {
      Room.findOne({ _id: room_id}, (err, room) => {
        if (err) reject(err);
        else resolve(room);
      });     
    }
    catch(error) {
      reject(error);
    }
  })
}

module.exports = {
  addNewMessage,
  addNewRoom,
  updateReadAt,
  getRoom
};
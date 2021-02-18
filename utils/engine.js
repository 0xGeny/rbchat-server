
var Room = require('../models/room.model');
var config  = require('../config');

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

function getRoomMembers(room_id) {
  return new Promise((resolve, reject) => {
    try {
      Room.findOne({_id: room_id}, (err, room) => {
        if (err) reject(err);
        else resolve(room);
      });     
    }
    catch(error) {
      reject(error);
    }
  })
}

function getMessages(room_id, position, count) {
  return new Promise((resolve, reject) => {
    try {
      var cnt = config.MESSAGE_LIMIT_PER_PAGE;
      if (cnt > count)
        cnt = count;
      Room.findOne({_id: room_id}, {messages: {$slice: [-(position + cnt),  cnt]}}, (err, room) => {
        if (err) reject(err);
        else resolve(room.messages);
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
  getRoomMembers,
  getMessages
};
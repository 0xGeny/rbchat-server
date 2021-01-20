const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  from: { type: Number, required: true }
}, {
  timestamps: true,
});

module.exports = MessageSchema;

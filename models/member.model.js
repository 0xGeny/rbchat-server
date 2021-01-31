const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  read_at: { type: Date, required: false },
  write_at: { type: Date, required: false }
});

module.exports = MemberSchema;
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  user_id: { type: Number, required: true }
});

module.exports = MemberSchema;
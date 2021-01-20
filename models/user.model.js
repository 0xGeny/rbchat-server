const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true, required: true },
  user_name: String,
  password: String,
  team_id: Number,
  avatar_url: String,
});

module.exports = mongoose.model('user', UserSchema);
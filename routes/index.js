require('dotenv').config()
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user.model');

// routes
router.post('/login', authenticate);

async function authenticate(req, res, next) {
  const { username, password } = req.body;
  const user = await User.findOne({ user_name: username });
  if (user && password == user.password) {
    const token = jwt.sign({ sub: user.user_id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    res.status(200).json({
      user_id: user.user_id,
      token: token
    });
  }
  else {
    res.status(200).json({
      "message": "Username and password are invalid. Please enter correct username and password"
    });
  }
}

module.exports = router;
require('dotenv').config()
var jwt = require('jsonwebtoken');
const config = require('../config');
var User = require('../models/user.model');
var rbapi = require('../utils/rbapi');
var userinfo = require('../utils/userinfo');

async function login_db(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ user_name: username });
  if (user && password == user.password) {
    const auth_info = {
      user_id: user.user_id
    };
    const token = jwt.sign(auth_info, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: config.TOKEN_EXPIRE_TIME });
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

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await rbapi.authUser(username, password);
    if (typeof user.user_id !== "number")
      throw "Authentication Error";
    if (userinfo.isUserAlive(user.user_id))
      throw "You are signed in on another device.";
    const auth_info = {
      user_id: user.user_id
    };
    const token = jwt.sign(auth_info, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: config.TOKEN_EXPIRE_TIME });
    res.status(200).json({
      user_id: user.user_id,
      token: token
    });
  }
  catch(error) {
    res.status(200).json({
      "message": error
    });
  }
}

module.exports = {login};
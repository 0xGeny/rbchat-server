require('dotenv').config()
var User = require('../models/user.model');

async function getAll(req, res) {
  res.status(200).send("asdfasdfa");
}

module.exports = {getAll};
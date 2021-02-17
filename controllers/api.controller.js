require('dotenv').config()
var User = require('../models/user.model');
var Room = require('../models/room.model');
var userinfo = require('../utils/userinfo');
var rbapi = require('../utils/rbapi');
var engine = require('../utils/engine');
var config = require('../config');

async function getAll(req, res) {
  const user_id = req.user.user_id;
  
  var users;
  try {
    //users = await User.find({});
    users = await rbapi.fetchUsers();
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

var multer  = require('multer')
var upload = multer({ dest: 'public/' + config.UPLOAD_PATH }).single('file');

function postFile(req, res) {
  
  upload(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        console.log("The file size is too big! Max. 10MB");
        res.status(200).json({
          success: false,
          message: "File Size Limit. Max: 10MB",
        });
      } else {
        console.log(err);
        res.status(200).json({
          success: false,
          message: "Upload Failed",
        });
      }
    }
    else {
      res.status(200).json({
        success: true,
        path: config.UPLOAD_PATH + req.file.filename
      })
    }    
  })
}


module.exports = { getAll, postFile };
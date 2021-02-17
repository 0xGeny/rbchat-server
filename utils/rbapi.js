const axios = require('axios');
const querystring = require('querystring');
const config = require('../config');
var users = null;
var last_update = 0;

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    var data = {
      grant_type: 'password',
      username: username,
      password: password,
      client_id: 'rbchat',
      client_secret: 'chatpass',
      redirect_uri: 'http://localhost',
      scope: '',
  };
  
  axios.post(config.RB_LOGIN_URL, querystring.stringify(data))
    .then(res => {
      resolve(res.data);
    })
    .catch(error => {
      if (error.response) reject(error.response.data.error_description);
      else reject("Authentication Error");
    })  

  })
}

const getUser = (access_token) => {
  return new Promise((resolve, reject) => {
    axios.get(config.RB_RESOURCE_URL + '?access_token=' + access_token)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        if (error.response) reject(error.response.data.error_description);
        else reject(error.message);
      });
  })
}

const getUserList = (access_token) => {
  return new Promise((resolve, reject) => {
    axios.get(config.RB_RESOURCE_USERS_URL + '?access_token=' + access_token)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        if (error.response) reject(error.response.data.error_description);
        else reject(error.message);
      });
  })
}

const authUser = (username, password) => {
  return new Promise((resolve, reject) => {
    login(username, password)
      .then(lg_data => {
        getUser(lg_data.access_token)
          .then(res => {
            if (res.success) resolve({user_id: Number(res.data.uid)});
            else reject("Authentication Error");
          })
          .catch(reject);
      })
      .catch(reject);
  })
}

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    if (users && last_update + config.SERVER_UPDATE_INTERVAL > Date.now()) {
      resolve(users);
      return;
    }
    login("ryonbong1", "1234567890")
      .then(lg_data => {
        getUserList(lg_data.access_token)
          .then(user_data => {
            if (user_data.success) {
              users = formatUsers(user_data.data);
              last_update = Date.now();
              resolve(users);
            }
            else
              reject("Logical error.");
          })
          .catch(reject);
      })
      .catch(reject);
  })
}

const formatUsers = (rawData) => {
  var users_new = [];
  for (var i = 0; i < rawData.length; i++) {
    const raw = rawData[i];
    const newUser = {
      user_id: Number(raw.id),
      user_nickname: raw.userid,
      user_name: raw.name,
      avatar_url: raw.avatar,
      team_id: raw.teamid,
      role: raw.role,
      scope: raw.scope
    }
    users_new.push(newUser);
  }
  return users_new;
}

module.exports = {
  users,
  login,
  authUser,
  fetchUsers
};


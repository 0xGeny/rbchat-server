const config = require('../config');

var uinfos = {};
var onChangeUinfo = null;

const setOnUinfoChanged = (callback) => {
  onChangeUinfo = callback;
}

const connectUserInfo = (user_id, socket) => {
  refreshUserInfo(user_id);
  uinfos[user_id].socket = socket;
}

const setUserTyping = (user_id, room_id) => {
  refreshUserInfo(user_id);
  uinfos[user_id].typing_at = room_id;
}

const refreshUserInfo = (user_id) => {
  var uinfo = uinfos[user_id];
  if (!uinfo) uinfo = {};
  let prev_status = uinfo.status;
  uinfo.last_seen = new Date();
  uinfo.watch_dog = config.MAX_WATCH_DOG_COUNT;
  uinfo.status = 1; // 1: online, 2: offline, 3: away
  uinfos[user_id] = uinfo;
  if (prev_status !== uinfo.status)
    return true;
  return false;
}

const disconnectUserInfo = (user_id) => {
  var uinfo = uinfos[user_id];
  if (!uinfo) uinfo = {};
  uinfo.socket = null;
  uinfo.typing_at = null;
  uinfo.watch_dog = 0;
  uinfo.status = 2;
  uinfos[user_id] = uinfo;
  return uinfo;
}

const getReducedInfos = () => {
  var uinfos_reduced = {};
  for (var user_id in uinfos) {
    const uinfo = uinfos[user_id];
    uinfos_reduced[user_id] = {
      typing_at: uinfo.typing_at,
      last_seen: uinfo.last_seen,
      status: uinfo.status,
      watch_dog: uinfo.watch_dog
    }
  }
  return uinfos_reduced;
}

const getOneReducedInfo = (user_id) => {
  const uinfo = uinfos[user_id];
  return {
    typing_at: uinfo.typing_at,
    last_seen: uinfo.last_seen,
    status: uinfo.status
  }
}

module.exports = {
  uinfos,
  setOnUinfoChanged,
  connectUserInfo, 
  setUserTyping,
  refreshUserInfo,
  disconnectUserInfo,
  getReducedInfos,
  getOneReducedInfo
}
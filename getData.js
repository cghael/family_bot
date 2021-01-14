// var data = require('./data.json');

function getChatData(chat_id, data) {
    // console.log(data);
    // console.log("in func " + chat_id);
    for (let n = 0; n < data.chats.length; n++) {
        if (chat_id === data.chats[n].id) {
            // console.log(data.chats[n].users);
            return data.chats[n].users
        }
    }
    // console.log("HUY");
    return null;
}

function searchUserData(userID, users) {
    for (let user of users) {
        if (userID === user.id) {
            return user;
        }
    }
    return null;
}

module.exports.getChatData = getChatData;
module.exports.searchUserData = searchUserData;
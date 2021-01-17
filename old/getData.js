const fs = require('fs');

function searchUserData(msg, data, callback) {
    console.log("searching...");
    for (let chat of data.chats) {
        if (msg.chat.id === chat.id) {
            for (let user of chat.users) {
                if (msg.from.id === user.id) {
                    console.log("user found");
                    return callback(user, data, msg);
                }
            }
            console.log("no user");
            return callback(null, data, msg);
        }
    }
    console.log("no chat id");
    saveChatID(msg.chat.id, data);
    return callback(null, data, msg);
}

function saveChatID(chatID, data) {
    data.chats.push({id: chatID}, {users: []});
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
}

module.exports.searchUser = searchUserData;
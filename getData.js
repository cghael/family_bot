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
    //add chat to file
    // callback(null, data, msg);
}

module.exports.searchUser = searchUserData;
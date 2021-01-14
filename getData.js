
function searchUserData(chatID, userID, data, callback) {
    // console.log(1);
    for (let chat of data.chats) {
        if (chatID === chat.id) {
            for (let user of chat.users) {
                if (userID === user.id)
                callback(user);
            }
        }
    }
    return null;
}

module.exports.searchUserData = searchUserData;
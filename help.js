const fs = require('fs');

function debug(obj = {}) {
    return JSON.stringify(obj, null, 4);
}

function listenNewUser(data, useId) {
    let user = data.users.find(user => user.id === useId);
    if (user === undefined) {
        data.users.push({id: useId, wait: 0});
        user = data.users.find(user => user.id === useId);
        // fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
    }
    return user;
}

module.exports.debug = debug;
module.exports.listenNew = listenNewUser;
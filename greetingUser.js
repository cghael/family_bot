const fs = require('fs');
const getData = require('./getData.js');

function greeting(bot, msg, data) {
    console.log("greeting");
    getData.searchUser(msg, data, function (user, data, msg) {
        if (user) {
            userDataProcessing(bot, user, msg);
        } else {
            newUserProcessing(data, msg);
        }
    });
}

function userDataProcessing(bot, user, msg) {
    // console.log(44);
    if (user.name) {
        bot.sendMessage(msg.chat.id, `Здравствуйте, ${user.name}!`);
    } else {
        console.log("no user name");
        bot.sendMessage(msg.chat.id, `Здравствуйте, как я могу к Вам обращаться? Пожалуйста, воспользуйтесь командой '/name Имя', чтобы сообщить мне ваше имя. Спасибо!`);
    }
}

function newUserProcessing(data, msg) {
    console.log("new user creating...");
    // console.log(data);
    for (let chat of data.chats) {
        // console.log(chat);
        if (chat.id === msg.chat.id) {
            // console.log(chat.id);
            chat.users.push({id: msg.from.id});
        }
    }
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
}

module.exports.greeting = greeting;
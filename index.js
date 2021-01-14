process.env.NTBA_FIX_319 = 1;

const tgramBot = require('node-telegram-bot-api');
const help = require('./help.js');
const getData = require('./getData.js');
const fs = require('fs');
var data = require('./data.json');

const TOKEN = '1557772361:AAHMAKKfWgX8HuFZDZrU6elAXLgE6zCPvf0';

const bot = new tgramBot(TOKEN, {
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
});

bot.on('message', msg => {
    if (msg.text === 'debuga') {
        bot.sendMessage(msg.chat.id, help.debug(msg));
    } else {
        fs.appendFileSync("log.txt", JSON.stringify(msg, null, 4));
    }
});

bot.onText(/\/hi/, msg => {
    getData.searchUserData(msg.chat.id, msg.from.id, data, (user) => {
        if (user && user.id && user.name) {
            bot.sendMessage(msg.chat.id, `Здравствуйте, ${user.name}!`);
        } else {
            for (let chat of data.chats) {
                if (chat.id === msg.chat.id) {
                    chat.users.push({id: msg.from.id});
                }
            }
            fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
        }
    });
})
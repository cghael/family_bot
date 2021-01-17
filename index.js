process.env.NTBA_FIX_319 = 1;

const tgramBot = require('node-telegram-bot-api');
const help = require('./help.js');
const wait = require('./wait.js');
const fs = require('fs');
const data = require('./data.json');
const { clear, time } = require('console');

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
    let user = help.listenNew(data, msg.from.id);
    if (user.wait != undefined && user.wait > 0 && msg.text[0] != "/") {
        wait.waitHandler(bot, msg, user);
        user.wait = 0;
        clearTimeout(user.timer);
    } else {
        if (msg.text.toLowerCase().indexOf('доброе утро') >= 0 || msg.text.toLowerCase().indexOf('доброе') >= 0) {
            if (user.name) {
                bot.sendMessage(msg.chat.id, `Доброе утро, ${user.name}! Хорошего вам дня!`);
            } else {
                bot.sendMessage(msg.chat.id, `Доброе утро, ${msg.from.first_name}! Хорошего вам дня!`);
            }
        }
    }
});

bot.onText(/\/hi/, msg => {
    let user = data.users.find(user => user.id === msg.from.id);
    user.wait = 0;
    if (user.name === undefined) {
        bot.sendMessage(msg.chat.id, `Здравствуйте, ${msg.from.first_name}!`);
    } else {
        bot.sendMessage(msg.chat.id, `Здравствуйте, ${user.name}!`);
    }
})

bot.onText(/\/name/, msg => {
    let user = data.users.find(user => user.id === msg.from.id);
    clearTimeout(user.timer);
    if (user.name === undefined) {
        bot.sendMessage(msg.chat.id, `Пожалуйста, ${msg.from.first_name}, скажите мне, как бы вы хотели, чтобы я к Вам обращался с этого момента?`);
    } else {
        bot.sendMessage(msg.chat.id, `Пожалуйста, ${user.name}, скажите мне, как бы вы хотели, чтобы я к Вам обращался с этого момента?`);
    }
    user.wait = 1;
    user.timer = setTimeout(() => {
        user.wait = 0;
    }, 30000);
})

setTimeout((data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
}, 3600000);
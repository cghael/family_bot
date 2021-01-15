process.env.NTBA_FIX_319 = 1;

const tgramBot = require('node-telegram-bot-api');
const help = require('./help.js');
const hi = require('./greetingUser.js');
const getData = require('./getData.js');
const fs = require('fs');
const data = require('./data.json');

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
    hi.greeting(bot, msg, data);
})

bot.onText(/\/name/, msg => {
    let space = 0;
    if (msg.text === "/name" || msg.text === "/name ") {
        bot.sendMessage(msg.chat.id, "Пожалуйста, введите команду в формате '/name Имя', чтобы я мог запомнить ваше имя. Спасибо.");
    } else {
        if (msg.text[5] === ' ') {
            space = 1;
        }
        getData.searchUser(msg, data, function(user, data, msg) {
            user.name = msg.text.slice(5 + space);
            fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
            bot.sendMessage(msg.chat.id, `Спасибо, ${user.name}, теперь я буду обращаться к вам только так!`);
        });
    }
})
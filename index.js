process.env.NTBA_FIX_319 = 1;

const tgramBot = require('node-telegram-bot-api');
const debug = require('./help.js');
const fs = require('fs');

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

bot.on('message', function (msg) {
    const { id } = msg.chat;
    if (msg.text === 'debuga') {
        bot.sendMessage(id, debug(msg));
    } else {
        fs.appendFileSync("log.txt", JSON.stringify(msg.from, null, 4));
        // bot.sendMessage(id, `Здравствуйте, семья, я ваш бот Дворецкий. Рад вам служить. Я пока еще ничего не умею, но буду учиться. Всем хорошего вечера!`)
        //     .then(() => {
        //         let log = fs.appendFileSync("log.txt", JSON.stringify(msg, null, 4));
        //     })
    }
});

bot.onText(/\/hi/, msg => {
    const { id } = msg.chat;
    let userID = msg.from.id;
    switch (userID) {
        case 259609589:
            bot.sendMessage(id, "Здравствуйте, Антон Павлович!")
            break;
        case 1385734161:
            bot.sendMessage(id, "Здравствуйте, Сергей Александрович!")
            break;
        case 1174295859:
            bot.sendMessage(id, "Здравствуйте, Александр Александрович!")
            break;
        case 1131059671:
            bot.sendMessage(id, "Здравствуйте, Павел Васильевич!")
            break;
        default:
            bot.sendMessage(id, `Здравствуйте, ${msg.from.first_name} ${msg.from.last_name}!`)
    }
})
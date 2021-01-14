process.env.NTBA_FIX_319 = 1;

const tgramBot = require('node-telegram-bot-api');
const help = require('./help.js');
const getData = require('./getData.js');
const fs = require('fs');
var data = null;

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
    let chatID = msg.chat.id;
    let users = getData.getChatData(chatID, data);
    console.log("bot.on users " + users);
    if (msg.text === 'debuga') {
        bot.sendMessage(id, help.debug(msg));
    } else {
        fs.appendFileSync("log.txt", JSON.stringify(msg, null, 4));
        // bot.sendMessage(id, `Здравствуйте, семья, я ваш бот Дворецкий. Рад вам служить. Я пока еще ничего не умею, но буду учиться. Всем хорошего вечера!`)
        //     .then(() => {
        //         let log = fs.appendFileSync("log.txt", JSON.stringify(msg, null, 4));
        //     })
    }
});

bot.onText(/\/hi/, msg => {
    let chatID = msg.chat.id;
    let userID = msg.from.id;
    let users = getData.getChatData(chatID, data);
    let user = getData.searchUserData(userID, users);
    console.log("user = " + user);
    if (user) {
        console.log(user);
    } else {
        fs.readFile('data.json', 'utf8', function readFileCallback(err, data) {
            if (err){
                console.log(err);
            } else {
            let obj = JSON.parse(data);
            console.log(obj);
            for (let n of obj.chats) {
                if (n.id === chatID) {
                    n.users.push({id: userID});
                } else {
                    console.log("Error find chat_id");
                }
            }
            fs.writeFileSync('data.json', JSON.stringify(obj, null, 4)); // write it back 
        }});
    }

    // for (let n = 0; n < data; n++)
    // let chatUsers = 
    // switch (userID) {
    //     case 259609589:
    //         bot.sendMessage(id, "Здравствуйте, Антон Павлович!")
    //         break;
    //     case 1385734161:
    //         bot.sendMessage(id, "Здравствуйте, Сергей Александрович!")
    //         break;
    //     case 1174295859:
    //         bot.sendMessage(id, "Здравствуйте, Александр Александрович!")
    //         break;
    //     case 1131059671:
    //         bot.sendMessage(id, "Здравствуйте, Павел Васильевич!")
    //         break;
    //     default:
    //         bot.sendMessage(id, `Здравствуйте, ${msg.from.first_name} ${msg.from.last_name}!`)
    // }
})
function waitHandler(bot, msg, user) {
    switch(user.wait) {
        case 1: 
            user.name = msg.text;
            bot.sendMessage(msg.chat.id, `Хорошо, ${user.name}, теперь я буду обращаться к вам так!`);
            break;
    }
}

module.exports.waitHandler = waitHandler;
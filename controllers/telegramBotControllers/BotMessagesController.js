const telegramBotCtl = require('../telegramBotControllers/BotController');
const telegramBotContentBuilder = require('../telegramBotControllers/BotContentBuilder');
const messagesDbCtl = require('../databaseControllers/messagesDBController');
class BotMessagesController {
    constructor(message) {
        this.botMessage = message;
        this.botCtl = new telegramBotCtl(process.env.BOT_TOKEN);
        this.botContentBuilder = new telegramBotContentBuilder();
        this.messagesCtl = new messagesDbCtl();
        this._processBotMessage(this.botMessage);
    }
    _processBotMessage(message) {
        if (message && message.callback_query && message.callback_query.data) {
            // Process Bot Button Callback Messages
            const chatID = message.callback_query.message.chat.id;
            const telegramID = message.callback_query.from.id;
            const callbackData = message.callback_query.data;
            const callbackAction = JSON.parse('' + callbackData);
            console.log('process messages:', callbackAction);
            if (callbackAction['callback'] == "categoris") {
                this.botCtl.sendMessageWithMessageButton(chatID, "ውይ እስቲ እደገና ይሞክሩ", [
                    { 'title': "የፍቅር መልዕክቶች", "callback": { "callback": "one" } },
                    {
                        'title': "ልጟደኛ የሚሆኑ",
                        "callback": { "callback": "friends" },
                    },
                    {
                        'title': "ለዘመድ የሚሆኑ",
                        "callback": { "callback": "relatives" }
                    },
                    {
                        'title': "ልዩ ልዩ መልዕክቶች",
                        "callback": { "callback": "others" }
                    }
                ], (resp2) => {
                    console.log(resp2);
                });
            } else {
                const qury_str = callbackAction['callback'];
                console.log(qury_str);
                this.messagesCtl.getMessageRandom({ "category": qury_str }, (result) => {
                    if (result) {
                        this.botCtl.sendMessageWithMessageButton(chatID, result.message, [{ 'title': "ሌላ መልዕክት", "callback": { "callback": result.category } }, { 'title': "ሌላ ዘርፍ", "callback": { "callback": "categoris" } }, { 'title': "አጋራ", "callback": { "switch_inline_query": "" } }], (resp2) => {
                            console.log(resp2);
                        });
                    } else {
                        this.botCtl.sendMessageWithMessageButton(chatID, "ውይ እስቲ እደገና ይሞክሩ", [{ 'title': "ሌላ መልዕክት", "callback": { "callback": "one" } }, { 'title': "ሌላ ዘርፍ", "callback": { "callback": "categoris" } }, { 'title': "አጋራ", "callback": { "switch_inline_query": "" } }], (resp2) => {
                            console.log(resp2);
                        });
                    }
                });
            }
        } else if (message && message.message) {
            // Process Menu Callback Actions
            const chatID = message.message.chat.id;
            const telegramID = message.message.from.id;
            const messageData = message.message;
            this.botCtl.sendMessageWithMenuButton(chatID, "Welcome To Ethiopian New Year Bot", this.botContentBuilder.getMenuButtons(), (resp) => {
                this.messagesCtl.getMessageRandom({}, (result) => {
                    if (result) {
                        this.botCtl.sendMessageWithMessageButton(chatID, result.message, [{ 'title': "ሌላ መልዕክት", "callback": { "callback": result.category } }, { 'title': "ሌላ ዘርፍ", "callback": { "callback": "categoris" } }, { 'title': "አጋራ", "callback": { "switch_inline_query": "" } }], (resp2) => {
                            console.log(resp2);
                        });
                    } else {
                        this.botCtl.sendMessageWithMessageButton(chatID, "ውይ እስቲ እደገና ይሞክሩ", [{ 'title': "ሌላ መልዕክት", "callback": { "callback": "one" } }, { 'title': "ሌላ ዘርፍ", "callback": { "callback": "categoris" } }, { 'title': "አጋራ", "callback": { "switch_inline_query": "" } }], (resp2) => {
                            console.log(resp2);
                        });
                    }
                });
            })
        } else {
            console.log('TEST: ', 'WORNG INPUT');
        }
    }
}
module.exports = BotMessagesController
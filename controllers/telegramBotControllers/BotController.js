const botRequestCtl = require('./BotRequestApi');
const botContentBuilderCtl = require('./BotContentBuilder');
class BotController {
    constructor(botToken) {
        this.botToken = botToken;
        this.botRequestAPI = new botRequestCtl(this.botToken);
        this.buttonBuilder = new botContentBuilderCtl();
    }
    sendMessageWithMessageButton(chatId, message, messageButtons, callback, buttons_in_a_row = 3) {
        const sendMessage = {
            'chat_id': chatId,
            'text': message,
            'reply_markup': this.buttonBuilder.getMessageButtons(messageButtons, buttons_in_a_row)
        }
        this.botRequestAPI.post('sendMessage', sendMessage, callback);
    }
    sendMessageWithMenuButton(chatId, message, menuButtons, callback, buttons_in_a_row = 3) {
        const sendMessage = {
            'chat_id': chatId,
            'text': message,
            'reply_markup': this.buttonBuilder.getMenuButtons(menuButtons, buttons_in_a_row)
        }
        this.botRequestAPI.post('sendMessage', sendMessage, callback);
    }
}
module.exports = BotController
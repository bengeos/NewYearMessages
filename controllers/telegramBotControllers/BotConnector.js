const request = require('request');
class BotConnector {
    constructor() {

    }
    connect(botToken, webHookUrl = "https://d5f3639e.ngrok.io/telegram_messages", callback) {
        const api_url = 'https://api.telegram.org/bot' + botToken + '/setWebhook';
        const hook_url = webHookUrl;
        var options = {
            uri: api_url,
            method: 'POST',
            json: { 'url': hook_url }
        };
        request(options, function(error, response, body) {
            callback(body);
        });
    }
}

module.exports = BotConnector
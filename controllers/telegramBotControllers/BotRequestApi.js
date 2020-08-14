const request = require('request');
class BotRequestApi {
    constructor(botToken) {
        this.telegram_api = "https://api.telegram.org/bot"
        this.telegram_bot_api = this.telegram_api + botToken;
    }
    post(methodName, jsonObject, callback) {
        const api_url = this.telegram_bot_api + '/' + methodName;
        var options = {
            uri: api_url,
            method: 'POST',
            json: jsonObject
        };
        request(options, function(error, response, body) {
            callback(error, response, body);
        });
    }
}
module.exports = BotRequestApi
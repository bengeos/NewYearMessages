class BotContentBuilder {
    getMenuButtons(menuButtonsList, buttons_in_a_row = 3) {
        const ReplyKeyboardMarkup = {
            keyboard: [],
            'resize_keyboard': true,
            'selective': true
        }
        if (Array.isArray(menuButtonsList)) {
            let buttonRows = [];
            let item_pos = 1;
            menuButtonsList.forEach(menuButtonItem => {
                if (item_pos <= buttons_in_a_row) {
                    buttonRows.push(this._getMenuButtonItem(menuButtonItem))
                    item_pos++;
                } else {
                    ReplyKeyboardMarkup.keyboard.push(buttonRows);
                    buttonRows = [];
                    buttonRows.push(this._getMenuButtonItem(menuButtonItem));
                    item_pos = 2;
                }
            });
            if (buttonRows.length > 0) {
                ReplyKeyboardMarkup.keyboard.push(buttonRows);
            }
        }
        return ReplyKeyboardMarkup;
    }
    _getMenuButtonItem(title, requestcontact = false, requestlocation = false) {
        return { text: title, request_contact: requestcontact, request_location: requestlocation }
    }
    getMessageButtons(messageButtons, buttons_in_a_row = 3) {
        const InlineKeyboardMarkup = {
            inline_keyboard: []
        }
        if (Array.isArray(messageButtons)) {
            let buttonRows = [];
            let item_pos = 1;
            messageButtons.forEach(messageButtonItem => {
                if (item_pos <= buttons_in_a_row) {
                    buttonRows.push(this._getMessageButtonItem(messageButtonItem.title, messageButtonItem.callback))
                    item_pos++;
                } else {
                    InlineKeyboardMarkup.inline_keyboard.push(buttonRows);
                    buttonRows = [];
                    buttonRows.push(this._getMessageButtonItem(messageButtonItem.title, messageButtonItem.callback));
                    item_pos = 2;
                }
            });
            if (buttonRows.length > 0) {
                InlineKeyboardMarkup.inline_keyboard.push(buttonRows);
            }
        }
        return InlineKeyboardMarkup;
    }
    _getMessageButtonItem(title, callback_jsonobject = {}) {
        return { text: title, callback_data: JSON.stringify(callback_jsonobject) }
    }
}
module.exports = BotContentBuilder
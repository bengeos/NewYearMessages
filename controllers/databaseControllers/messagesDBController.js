const Message = require('../../models/Message');
class MesagesDBController {
    constructor() {}
    getMessages(query, callback) {
        Message.find(query)
            .exec()
            .then(conversations => {
                callback(conversations);
            })
            .catch(error => {
                callback(null);
            })
    }
    getMessage(query, callback) {
        Message.findOne(query)
            .exec()
            .then(conversations => {
                callback(conversations);
            })
            .catch(error => {
                callback(null);
            })
    }
    getMessageRandom(query, callback) {
        Message.countDocuments(query, function(err, count) {
            if (count > 0) {
                var random = Math.floor(Math.random() * count)
                Message.findOne(query).skip(random).exec(
                    function(_err, _message) {
                        callback(_message);
                    });
            } else {
                callback(null);
            }
        });
    }
    addNewMessage(jsonData, callback) {
        const newMessage = new Message(jsonData);
        newMessage
            .save()
            .then(result => {
                callback(result);
            })
            .catch(err => {
                callback(false);
            });
    }
    updateMessage(jsonData, callback) {
        const newMessage = new Message(jsonData);
        newMessage
            .save()
            .then(result => {
                callback(result);
            })
            .catch(err => {
                callback(false);
            });
    }
    deleteMessage(query, callback) {
        Message.deleteOne(query)
            .exec()
            .then(conversations => {
                callback(conversations);
            })
            .catch(error => {
                callback(null);
            })
    }
    deleteMessages(query, callback) {
        Message.deleteMany(query)
            .exec()
            .then(conversations => {
                callback(conversations);
            })
            .catch(error => {
                callback(null);
            })
    }
}
module.exports = MesagesDBController;
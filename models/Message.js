const mongoose = require('mongoose');
const MessagesSchema = mongoose.Schema({
    message: String,
    category: String,
    created_at: { type: mongoose.Schema.Types.Date, default: Date.now }
});
module.exports = mongoose.model('Messages', MessagesSchema);
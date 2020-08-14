const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const telegramBotConnector = require('./controllers/telegramBotControllers/BotConnector');
const telegramBotRoute = require('./routes/telegramBotRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const messagesDb = require('./controllers/databaseControllers/messagesDBController');
const mongoose = require('mongoose');
require('dotenv/config');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, });

const botConnector = new telegramBotConnector();
// botConnector.connect(process.env.BOT_TOKEN, "https://de6adf867ece.ngrok.io/telegram_messages", (resp) => {
//     console.log(resp);
// });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/telegram_messages', telegramBotRoute);
app.use('/messages', messagesRoutes);
app.use((req, res, next) => {
    const error = new Error("Whoops! Unknown Error");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: { message: error.message }
    });
});

module.exports = app;
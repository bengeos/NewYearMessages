const express = require('express');
const router = express.Router();
const telegramBotMessageCtl = require('../controllers/telegramBotControllers/BotMessagesController');
router.post('/', (req, res, next) => {
    const data = req.body
    const botMessagesCtl = new telegramBotMessageCtl(data);
    // console.log('DATA->', data);
    res.status(200).json({
        status: true,
        message: ''
    })
});

module.exports = router;
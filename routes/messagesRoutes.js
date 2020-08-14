const express = require('express');
const router = express.Router();
const _messagesCtl = require("../controllers/databaseControllers/messagesDBController");
const messagesCtl = new _messagesCtl();
router.get('/:id', (req, res, next) => {
    messagesCtl.getMessage({ "_id": req.params.id }, (result) => {
        if (result) {
            res.status(200).json({
                'status': true,
                'result': result,
                'message': 'successfully fetched'
            })
        } else {
            res.status(500).json({
                'status': false,
                'result': null,
                'message': 'whoops! something wrong!'
            })
        }
    });
});

router.get('/', (req, res, next) => {
    messagesCtl.getMessages({}, (result) => {
        if (result) {
            res.status(200).json({
                'status': true,
                'result': result,
                'message': 'successfully fetched'
            })
        } else {
            res.status(500).json({
                'status': false,
                'result': null,
                'message': 'whoops! something wrong!'
            })
        }
    });
});
router.post('/', (req, res, next) => {
    const messageObj = req.body;
    messagesCtl.addNewMessage(messageObj, (result) => {
        if (result) {
            res.status(200).json({
                'status': true,
                'result': result,
                'message': 'successfully fetched'
            })
        } else {
            res.status(500).json({
                'status': false,
                'result': null,
                'message': 'whoops! something wrong!'
            })
        }
    });
});
router.delete('/:id', (req, res, next) => {
    const botId = req.params.id
    messagesCtl.addNewMessage(messageObj, (result) => {
        if (result) {
            res.status(200).json({
                'status': true,
                'result': result,
                'message': 'successfully fetched'
            })
        } else {
            res.status(500).json({
                'status': false,
                'result': null,
                'message': 'whoops! something wrong!'
            })
        }
    });
});

module.exports = router;
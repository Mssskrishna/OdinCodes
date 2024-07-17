var express = require('express');
var router = express.Router();
const Message = require('../models/message');

// GET home page
router.get('/', async (req, res, next) => {
    try {
        const messages = await Message.find().populate('author').exec();
        res.render('index', { messages, user: req.user });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user');
const Message = require('../models/message');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/messages/create', isAuthenticated, (req, res) => {
    res.render('create-message');
})

router.post('/messages/create', isAuthenticated, [
    body('title').trim().isLength({ min: 1 }).escape().withMessage('Title is required.'),
    body('text').trim().isLength({ min: 1 }).escape().withMessage('Message text is required.'),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('create-message', { errors: errors.array() });
        return;
    }
    try {
        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            author: req.user._id
        });
        await message.save();
        res.redirect('/')
    } catch (err) {
        next(err)
    }
})

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
  
  // Delete message route
  router.post('/messages/delete', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await Message.findByIdAndDelete(req.body.messageId);
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
var express = require('express');
var router = express.Router();


const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Message Board', messages: messages });
});

router.get('/new', function (req, res, next) {
  res.render('form');
});

router.post('/new', function (req, res, next) {
  const messageText = req.body.message;
  const messageUser = req.body.username;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect('/');
});

module.exports = router;

var express = require('express');
var router = express.Router();

const db = require('../db/query');

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date()
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date()
//   }
// ];

router.get('/', async function (req, res, next) {
  try {
    const messages = await db.getAllMessages();

    res.render('index', { title: 'Message Board', messages });
  } catch (error) {
    next(error); 
  }
});

router.get('/new', function (req, res, next) {
  res.render('form');
});

async function insertMessage(req, res) {
  const messageText = req.body.message.trim();
  const messageUser = req.body.username.trim();
  try {
    await db.insertMessage(messageText, messageUser);
    res.redirect('/')
  }
  catch (err) {
    res.status(500).send("An error occured during inserting message");
  }

}

router.post('/new', insertMessage);

module.exports = router;

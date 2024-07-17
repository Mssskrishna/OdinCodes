var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user');

router.get('/join-club', (req, res) => {
    if (req.user) {
        if (req.user.membership === true) {
            res.redirect('/messages/create');
        } else {
            res.render('join-club');
        }
    } else {
        res.redirect('/')
    }
})


router.post('/join-club', async (req, res) => {
    try {
        if (req.body.passcode === '1234') { // Ensure the passcode comparison is correct
            const user = await User.findOne({ email: req.user.email });
            if (user) {
                user.membership = true;
                await user.save();
                return res.redirect('/'); // Respond once and return
            } else {
                return res.status(404).send('User not found'); // Respond once and return
            }
        } else {
            return res.status(400).send('Incorrect passcode'); // Respond once and return
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error'); // Respond once and return
    }
});
module.exports = router;
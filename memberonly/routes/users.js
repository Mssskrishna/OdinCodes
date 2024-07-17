var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user');

/* GET users listing. */
router.get('/sign-up', function (req, res) {
  res.render('sign-up', { errors: [], formData: {} });
});

router.get('/login', function (req, res) {
  res.render('login');
});

// Handle POST request to /login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redirect to joinclub on successful login
  failureRedirect: '/login', // Redirect to login on failed login
}));

router.post(
  '/sign-up',
  [
    body('email').isEmail().withMessage('Enter a valid email').custom(async value => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('E-mail already in use');
      }
      return true;
    }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Log the errors to the console
      console.log(errors.array());

      // If validation errors exist, render the sign-up form with error messages
      return res.status(400).render('sign-up', { errors: errors.array(), formData: req.body });
    }

    try {
      const { firstname, lastname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ firstname, lastname, email, password: hashedPassword });
      await user.save(); 
      
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        res.redirect('/'); // Redirect to home page after successful sign-up
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


module.exports = router;

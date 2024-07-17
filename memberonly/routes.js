// routes.js
const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const createError = require('http-errors');
const clubRouter = require('./routes/club');
const messageRouter = require('./routes/message');

const router = express.Router();

router.use('/', indexRouter);
router.use('/', usersRouter);
router.use('/', clubRouter);
router.use('/', messageRouter);

// catch 404 and forward to error handler
router.use((req, res, next) => {
  next(createError(404));
});

// error handler
router.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;

// app.js
const { app, connectDB } = require('./config');
const passport = require('./passportConfig');
const router = require('./routes');

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

// Connect to the database and start the server
async function main() {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main().catch(err => console.error('Main function error:', err));

module.exports = app;

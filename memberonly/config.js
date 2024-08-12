// config.js
const path = require('path');
const createError = require('http-errors');
const express = require('express');
require("dotenv").config();

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

const app = express();
const mongodb = "mongodb+srv://mssskrishna:shanmukha@locallibrary.f5ncxzl.mongodb.net/member?retryWrites=true&w=majority&appName=locallibrary";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

mongoose.set("strictQuery", false);

async function connectDB() {
  try {
    await mongoose.connect(mongodb);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
}

module.exports = { app, passport, LocalStrategy, connectDB };

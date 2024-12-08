import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import blogRouter from "./routes/blog.router.js";
import usersRouter from "./routes/user.router.js";

const app = express();

// view engine setup
app.use(cors());
app.use(logger("dev"));

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/blog", blogRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.send("error")
});

export default app;

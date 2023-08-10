let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");

let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStrategy = passportLocal.Strategy;
let flash = require("connect-flash");

let mongoose = require("mongoose");
let DB = require("./db");

mongoose.set("strictQuery", false);
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedtopology: true });

let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "Connection Error:"));
mongodb.once("open", () => {
  console.log("connected to MongoDB...");
});

let indexRouter = require("../routes/index");
let usersRouter = require("../routes/users");
let surveyRouter = require("../routes/survey");

let app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

app.use(cors());

app.use(
  session({
    secret: DB.secret,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

let userModel = require("../models/user");
let user = userModel.user;
passport.use(user.createStrategy());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/surveys", surveyRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  return res.json({
    statusCode: 500,
    msg: err.message,
  });
});
module.exports = app;

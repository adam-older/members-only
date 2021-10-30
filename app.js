var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// Database setup
var mongoose = require("mongoose");
const mongoDB = require("./config/keys").mongoURI;

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// register hbs partials
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials", (err) => {
  if (err) throw new Error("Server Error");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Session and Passport setup
const session = require("express-session");
const passport = require("passport");
const sessionSecret = require("./config/keys").sessionSecret;

// Passport config - pull in passport.js and call function with parameter passport
require("./config/passport")(passport);

// Express Session
app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash
app.use(flash());

// global Express variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.loggedIn = req.isAuthenticated();
  // res.locals.isMember = req.user ? req.user.url : "none";
  // res.locals.currentUserId = req.user ? req.user.url : "none";
  res.locals.currentUser = req.user;
  next();
});

// testing
app.use((req, res, next) => {
  console.log("Logged in: " + res.locals.loggedIn);
  // console.log("Current user id: " + res.locals.currentUserId);
  if (res.locals.currentUser) {
    console.log("Current user id: " + res.locals.currentUser.url);
    // console.log(res.locals.currentUser);
  }
  // console.log(req.session);
  next();
});

// Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);

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
  res.render("error");
});

module.exports = app;

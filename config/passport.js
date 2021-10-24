const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log("user does not exist");
        return done(null, false, {
          message: "That username is not registered",
        });
      } // else user does exist, check password matches
      return comparePassword(password, user, done);
    })
    .catch((err) => done(err));
};

const comparePassword = (password, user, cb) => {
  bcrypt
    .compare(password, user.password)
    .then((isMatch) => {
      console.log(isMatch);
      if (isMatch) {
        console.log("login success");
        return cb(null, user);
      } else {
        console.log("password does not match");
        return cb(null, false, { message: "Password incorrect" });
      }
    })
    .catch((err) => cb(err));
};

const strategy = new LocalStrategy(customFields, verifyCallback);

module.exports = function (passport) {
  passport.use(strategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });
};

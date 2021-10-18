var User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.register_get = (req, res, next) => {
  try {
    res.render("register", {});
  } catch (err) {
    next(err);
  }
};

exports.register_post = [
  body("username")
    .escape()
    .custom((value) => {
      return User.findOne({ username: value })
        .then((user) => {
          if (user) {
            return Promise.reject("Username is taken");
          }
        })
        .catch((err) => {
          return next(err);
        });
    }),
  body("email")
    .isEmail()
    .escape()
    .withMessage("Invalid Email")
    .custom((value) => {
      return User.findOne({ email: value })
        .then((user) => {
          if (user) {
            return Promise.reject("Email is already in use");
          }
        })
        .catch((err) => {
          return next(err);
        });
    }),
  body("password")
    .escape()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("password2")
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    const { username, email, password } = req.body;
    if (!errors.isEmpty()) {
      // handle errors
      let error_msgs = errors.array().map((err) => err.msg);
      res.render("register", {
        username: username,
        email: email,
        errors: error_msgs,
      });
    } else {
      // form data is good, register user
      var user = new User({
        username,
        email,
        password,
      });
      user.save((err) => {
        if (err) return next(err);
      });
      res.redirect("login");
    }
  },
];

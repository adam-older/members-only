const { body } = require("express-validator");
const passport = require("passport");

exports.login_get = (req, res, next) => {
  try {
    res.render("login", {});
  } catch (err) {
    next(err);
  }
};

exports.login_post = [
  body("username").escape(),
  body("password").escape(),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    // failureFlash: true,
  }),
];

var User = require("../models/user");
const { body, validationResults } = require("express-validator");

exports.login_get = (req, res, next) => {
  try {
    res.render("login", {});
  } catch (err) {
    next(err);
  }
};

exports.login_post = [
  body("email").isEmail().escape().withMessage("Invalid Email"),
  body("password").escape(),

  (req, res, next) => {
    const errors = validationResults(req);
    if (!errors.isEmpty()) {
      // handle errors
      res.render("login", { email: req.body.email, errors: errors.array() });
    }
    try {
      console.log(req.body.email);
      console.log(req.body.password);

      res.redirect("login");
    } catch (err) {
      next(err);
    }
  },
];

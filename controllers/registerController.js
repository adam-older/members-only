var User = require("../models/user");
const { body, validationResults } = require("express-validator");

exports.register_get = (req, res, next) => {
  try {
    res.render("register", {});
  } catch (err) {
    next(err);
  }
};

exports.register_post = [
  body("email").isEmail().escape().withMessage("Invalid Email"),
  body("password").escape(),

  (req, res, next) => {
    const errors = validationResults(req);
    if (!errors.isEmpty()) {
      // handle errors
      res.render("register", { email: req.body.email, errors: errors.array() });
    } else {
      // form data is good, log-in user
    }
    try {
      console.log(req.body.email);
      console.log(req.body.password);

      res.redirect("register");
    } catch (err) {
      next(err);
    }
  },
];

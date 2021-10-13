var User = require("../models/user");
const { body, validationResults } = require("express-validator");

exports.login_get = (req, res, next) => {
  try {
    res.render("login", {});
  } catch (err) {
    next(err);
  }
};

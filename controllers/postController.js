var Post = require("../models/post");
var User = require("../models/user");
const { body, validationResults } = require("express-validator");

exports.index = async (req, res, next) => {
  try {
    var post_list = await Post.find()
      .populate("author")
      .sort([["date", "ascending"]]);
    res.render("index", { title: "Members Only", post_list });
  } catch (err) {
    next(err);
  }
};

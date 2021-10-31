var Post = require("../models/post");
var User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.index = async (req, res, next) => {
  try {
    var post_list = await Post.find()
      .populate("author")
      .sort([["date", "descending"]]);
    res.render("index", {
      title: "Members Only",
      post_list,
      membership_status: res.locals.currentUser
        ? res.locals.currentUser.membership_status
        : false,
    });
  } catch (err) {
    next(err);
  }
};

exports.create_new_post_get = (req, res, next) => {
  try {
    res.render("newpost", {});
  } catch (err) {
    next(err);
  }
};

exports.create_new_post_post = [
  body("post_title")
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Post must have a title"),
  body("post_body")
    .escape()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Post must have a message"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // handle errors
      let error_msgs = errors.array().map((err) => err.msg);
      res.render("newpost", { post_title, post_title });
    }
    // else, create post
    const { post_title, post_body } = req.body;
    let post = new Post({
      author: res.locals.currentUser,
      title: post_title,
      body: post_body,
    });
    post.save((err) => {
      if (err) return next(err);
    });
    req.flash("success_msg", "Your post has been saved");
    res.redirect("/");
  },
];

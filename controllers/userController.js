const User = require("../models/user");
const { body } = require("express-validator");

// exports.user_detail_get = async (req, res, next) => {
//   try {
//     let user = await User.findById(req.params.id);
//     const { username, creation_date, membership_status } = user;
//   } catch (err) {
//     return next(err);
//   }
//   res.render("user", {
//     username,
//     creation_date,
//     membership_status,
//   });
// };
exports.user_detail_get = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      const { username, creation_date, membership_status, _id } = user;
      if (
        res.locals.currentUser &&
        username === res.locals.currentUser.username
      ) {
        res.render("myaccount", { username, creation_date, membership_status });
      } else {
        res.render("user", { username, creation_date, membership_status });
      }
    })
    .catch((err) => next(err));
};

exports.member_get = (req, res, next) => {
  res.render("member", {});
};

exports.member_post = [
  body("passcode").escape(),
  (req, res, next) => {
    const { passcode } = req.body;
    const correctPasscode = "secret";
    if (passcode === correctPasscode) {
      User.updateOne(
        { username: res.locals.currentUser.username },
        { $set: { membership_status: true } }
      )
        .then(() => {
          req.flash("success_msg", "Success, you are now a member");
          res.redirect(res.locals.currentUser.url);
        })
        .catch((err) => next(err));
    } else {
      res.render("member", {
        error: ["The passcode you entered is incorrect"],
      });
    }
  },
];

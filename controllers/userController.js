const User = require("../models/user");

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

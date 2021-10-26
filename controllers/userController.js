const User = require("../models/user");

exports.user_detail_get = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    const { username, creation_date, membership_status } = user;
    res.render("user", {
      username,
      creation_date,
      membership_status,
    });
  } catch (err) {
    return next(err);
  }
};

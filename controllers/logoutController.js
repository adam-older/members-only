exports.logout_get = (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
};

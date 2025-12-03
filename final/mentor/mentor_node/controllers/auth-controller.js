exports.verifyAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  req.flash('error', "Login required to access this page");
  req.session.returnTo = req.originalUrl;
  res.redirect("/user/login");
};

exports.verifyAdmin = (req, res, next) => {
  if (req.session.user?.roles.includes("admin"))
    return next();
  req.flash('error', 'You must be an admin to access this page');
  req.session.returnTo = req.originalUrl;
  res.redirect('/user/login');
};
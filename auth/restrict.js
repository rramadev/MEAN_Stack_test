module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("Access to this resource denied, redirecting to home page...");
  res.redirect('/');
};

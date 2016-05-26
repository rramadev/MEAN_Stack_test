var express = require('express');
var router = express.Router();

/* GET / - Index - Login User. */
router.get('/', function(req, res, next) {
  if (req.user) {
    // Use return to avoid "Headers error"
    return res.redirect('/orders');
  }
  res.render('index', {
    title: 'Login',
    error: req.flash('error')
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET Login User. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login User'
  });
});

// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;

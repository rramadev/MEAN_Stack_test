var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
// var passport = require('passport');
// var Account = require('../models/account');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* POST Login user. */
router.post('/login', function(req, res) {
  res.redirect('/');
});

/* GET Create user. */
router.get('/create', function(req, res, next) {
  res.render('users/create', {
    title: 'Create an account'
  });
});

/* POST Create user. */
router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err) {
    if (err) {
      delete req.body.password;
      return res.render('users/create', {
        title: 'Create an account',
        input: req.body,
        error: 'Something went wrong!'
      });
    }
    res.redirect('/orders');
  });
  // Account.register(new Account({ email : req.body.email, password : req.body.password }), function(err, account) {
  //     if (err) {
  //         console.log (err);
  //         return res.render('users/create', {
  //           account : account,
  //           title: 'Create an account'
  //         });
  //     }
  //
  //     passport.authenticate('local')(req, res, function () {
  //         res.redirect('/orders');
  //     });
  // });
});

module.exports = router;

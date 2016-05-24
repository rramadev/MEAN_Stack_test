var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
// var passport = require('passport');
// var Account = require('../models/account');

/* POST Login user. */
router.post('/login', function(req, res) {
  res.redirect('/');
});

/* GET Logout user. */
router.get('/logout', function(req, res) {
    req.logout();
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
      console.log(err);
      delete req.body.password;
      return res.render('users/create', {
        title: 'Create an account',
        input: req.body,
        error: err
      });
    }
    res.redirect('/orders');
  });
});

module.exports = router;

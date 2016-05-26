var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
var passport = require('passport');
var config = require('../config/config');
// var Account = require('../models/account');

/* POST Login user. */
router.post('/login',
  function(req, res, next) {
    // Set Cookie expiration date to 30 days, transform Session Cookie to Persistent Cookie
    req.session.cookie.maxAge = config.cookieMaxAge;
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/orders',
    failureRedirect: '/',
    failureFlash: true
  }
));
  // *Updated by 'successRedirect'
  // ,function(req, res, next) {
  // // If user has been successfully authenticated
  // res.redirect('/orders');

/* GET Logout user. */
router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

/* GET Create new user. */
router.get('/create', function(req, res, next) {
  res.render('users/create', {
    title: 'Create an account'
  });
});

/* POST Create new user. */
router.post('/api/create', function(req, res, next) {
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
    // Manually create login session when new user is created
    req.login(req.body, function(err) {
      res.redirect('/orders');
    });
  });
});

module.exports = router;

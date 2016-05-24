// ** Variables
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// ** Require modules
var config = require('./config/config');
var routes = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/orders');

// ** Express App
var app = express();

// ** MongoDB Connection
mongoose.connect(config.mongoUri);

// ** View engine setup
app.set('views', path.join(__dirname, 'views'));
// EJS als View engine
app.set('view engine', 'ejs');

// ** ENV Settings
// Settings to load files depending on ENV
console.log("NODE_ENV: " + app.get('env'));
// app.set('production', process.env.NODE_ENV === 'production');
app.set('development', app.get('env') === 'development');

// ** Middleware Pipeline **
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('express-session')({
//     secret: 'xxx keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// ** Passport config
// var Account = require('./models/account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// ** Valid routes
app.use('/', routes);
app.use('/users', users);
app.use('/orders', orders);

// ** Invalid route
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ** Error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// ** Export Express App Module
module.exports = app;

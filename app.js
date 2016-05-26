// ** Required Modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var connectMongo = require('connect-mongo');

// ** Required Files
var config = require('./config/config');
var index = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/orders');

var MongoStore = connectMongo(expressSession);

var passportConfig = require('./auth/passport-config');
passportConfig();

// ** Express App
var app = express();

// ** MongoDB Connection
mongoose.connect(config.mongoUri);

// ** View engine setup
// Views path
app.set('views', path.join(__dirname, 'views'));
// EJS als View engine
app.set('view engine', 'ejs');

// ** ENV Settings
// Settings to load files depending on ENV
console.log("NODE_ENV: " + app.get('env') + ". Server Started...");
// app.set('production', process.env.NODE_ENV === 'production');
// app.set('development', app.get('env') === 'development');

// ** Middleware Pipeline **
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'xxx keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      // Store the Session Cookie (Persistent) in MongoDB
      mongooseConnection: mongoose.connection
    })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ** Passport config
// var Account = require('./models/account');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// ** Valid routes
app.use('/', index);
app.use('/users', users);
app.use('/orders', orders);

// ** Invalid route
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Resource Not Found');
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

// ** Export Express-App Module
module.exports = app;

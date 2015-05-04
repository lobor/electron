var express = require('express');

var configDb = require('./config/db');

var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var login = require('./routes/login');
var routes = require('./routes/index');
var users = require('./routes/users');
var sci = require('./routes/sci');

var session = require('express-session');

var cors = require('cors');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'yoursecret',
    name: 'Auth',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        domain: false,
        maxAge: 10000 * 60 * 24, // 24 hours,
        httpOnly: true
    }
}));

app.use(function(req, res, next) {
    if(req.headers.origin == 'http://local.locloud.com'){
        res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Origin', 'http://local.locloud.com');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        if(!req.session.Auth && req.url != '/auth/authenticate' && req.url != '/auth/check'){
            // var err = new Error('Not Found');
            // err.status = 401;
            // next(err);

            // res.status(401);
            // res.json({status:false});
            // next();
        }
    }
    next();
});


// // Auth avec tocken
// app.use(function(err, req, res, next){
//     if(!req.session.Auth && (req.url != '/auth/authenticate')){
//         var err = new Error('Unauthorized');
//         err.status = 401;
//         res.status(err.status);
//         res.render('error', {
//           message: err.message,
//           error: err
//         });
//         // next(err);
//     }
//     else{
//         next();
//     }
// })


app.use('/', routes);
app.use('/auth', login);
app.use('/users', users);
app.use('/sci', sci);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      console.log(err.status);
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
    console.log(err.status);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

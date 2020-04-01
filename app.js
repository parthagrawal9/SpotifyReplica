var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');
const basicauth = require('./basic-auth')

var indexRouter = require('./routes/index');  //routes for indexdefault
var usersRouterDefalut = require('./routes/users'); //routes for userdefault
var artistRouter = require('./routes/artistRoutes'); //routes for artists
var songRouter = require('./routes/songRoutes'); //routes for songs
var usersRouter = require('./routes/userRoutes'); //routes for users

var app = express();

const url = 'mongodb://localhost:27017/SpotifyReplica';
const connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
connect.then((db)=>{ // connecting to mongodb
  console.log("connected to mongo")
}).catch((err)=>console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//cors filter
app.use(cors({ origin: "*" }));

//logger
app.use(logger('dev'));

//express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// public static paths
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

// authentication
app.use(basicauth)

//routes redirecting to particular route
app.use('/', indexRouter);
app.post('/login', function(req, res, next) {
  res.status(200).json(global.user)
});
app.use('/users', usersRouterDefalut);
app.use('/api/artists',artistRouter);
app.use('/api/songs',songRouter);
app.use('/api/users',usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

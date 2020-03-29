var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artistRouter = require('./routes/artistRoutes');
var songRouter = require('./routes/songRoutes');
var usersRouter = require('./routes/userRoutes');

var app = express();

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/SpotifyReplica';
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log("connected to mongo")
}).catch((err)=>console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ origin: "*" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'assets/song_cover')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
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

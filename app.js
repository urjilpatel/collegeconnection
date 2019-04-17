var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var fileuplod = require('express-fileupload');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AreaRouter = require('./routes/Area');
var bookRouter = require('./routes/book');
var BranchRouter = require('./routes/Branch');
var bookinquiryRouter = require('./routes/bookinquiry');
var CollegeRouter = require('./routes/College');
var groupRouter = require('./routes/group');
var grouppostRouter = require('./routes/grouppost');
var materialRouter = require('./routes/material');
var SemRouter = require('./routes/Sem');
var chatRouter = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 2000000 }}));
app.set('view engine', 'ejs');
app.use(fileuplod());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Area', AreaRouter);
app.use('/book', bookRouter);
app.use('/Branch', BranchRouter);
app.use('/bookinquiry', bookinquiryRouter);
app.use('/College', CollegeRouter);
app.use('/group', groupRouter);
app.use('/grouppost', grouppostRouter);
app.use('/material', materialRouter);
app.use('/Sem', SemRouter);
app.use('/chat', chatRouter);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/database3',{useNewUrlParser: true})
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err))
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

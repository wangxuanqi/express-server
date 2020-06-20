const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressJWT = require('express-jwt');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const PRIVATE_KEY = require('./config').token.PRIVITE_KEY;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));//加载静态资源

// app.use(expressJWT({
//   secret: PRIVATE_KEY
// }).unless({
//   path: ['/api/user/register','/api/user/login'] //⽩白名单,除了了这⾥里里写的地址，其他的URL都需要验证
// }));

//路由加载
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users', loginRouter);

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

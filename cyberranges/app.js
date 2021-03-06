// EJEMPLOS DE AYUDA
// video on forms https://www.youtube.com/watch?v=V9JyBCTcDsg&ab_channel=RithmSchool
// video on auth https://medium.com/@nima.2004hkh/create-your-first-login-page-with-exprerssjs-pug-f42250229486

// boilerplate variables for express
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var generalRouter = require('./routes/general');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/general', generalRouter);

app.get('/general', function (req, res) {
  return res.render('general-form', { title: 'The General Form' });
})


app.get('/submit-general', function (req, res) {
  console.log(req.query.infoSecurity)
  return res.render('submit-general', {
    title: "General Cyber Resilience",
    infoSecurity: req.query.infoSecurity,
    threatManagement: req.query.threatManagement,
    infoSharing: req.query.infoSharing,
    training: req.query.training,
    businessContinuity: req.query.businessContinuity

  });
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

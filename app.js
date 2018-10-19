
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var config = require('config')
var handlebars = require('express-handlebars');
const paginate = require('handlebars-paginate');


var app = express();


// database connection
mongoose.connect(config.get("database.url"))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views"),
    defaultLayout: "layout.hbs"
  })
);
app.set('view engine', "hbs");
app.paginationLimit = 10;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(config.get("base_url"),require('./app/routes'));

handlebars = handlebars.create({
  partialsDir: ["views"],
  helpers: {
    paginate:paginate,


  }

});

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

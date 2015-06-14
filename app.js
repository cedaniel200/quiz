var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
var moment = require('moment');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('semilla aleatoria para encriptar'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Helpers dinamicos:
app.use(function(req, res, next){
  //Guarda path en session.redir para despues de login
  if(!req.path.match(/\/login|\/logout/)){
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

// MW para auto-logout
app.use('/*', function(req, res, next){
  if(req.session.user){
    var fecha_actual = moment();
    var fecha_session = moment(req.session.time);
    var diferencia = fecha_actual.diff(fecha_session, 'minute')
    if( diferencia < 2){
      req.session.time = fecha_actual;
      next();
    }else{
      delete req.session.user;
      res.redirect(req.session.redir.toString());
    }
  }else{
    next();
  }
});

app.use('/', routes);

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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});


module.exports = app;

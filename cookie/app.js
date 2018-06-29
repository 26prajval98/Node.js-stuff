var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('94496prae'));

function authorize(req,res,next){
  console.log(req.headers);
  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      var err = new Error("Not Authenticated");
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }
    var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    if(username==='root'&&password==='root'){
      res.cookie('user','admin',{signed:true});
      next();
    }
    else{
      var err = new Error("Not Authenticated");
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }
  }
  else{
    if(req.signedCookies.user === 'admin'){
      next();
    }
    else{
      var err = new Error("Not Authenticated");
      err.status = 401;
    //res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }
  }
}


app.use(authorize);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
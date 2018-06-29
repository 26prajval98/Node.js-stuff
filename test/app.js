var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var res = require('/routes/db');
var index = require('./routes/index');
var users = require('./routes/users');
var MongoClient = require('mongodb').MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://aradhana18:aradhana2018@ds033196.mlab.com:33196/registration_individual_category1";

//var obj;

MongoClient.connect(url).then((db)=>{
    console.log('Connected Peacefully');
    return db.collection('I').find({}).toArray()
})
.then((res)=>{
    console.log(res);
    //module.exports = obj; 
})
.catch((err)=>{
    throw err;
});

app.use('/', index);
app.use('/users', users);
//app.use('/db',res);

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

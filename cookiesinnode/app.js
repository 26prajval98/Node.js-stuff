var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileStore = require('session-file-store')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var url = "mongodb://test:test@ds046047.mlab.com:46047/users";
var connect = mongoose.connect(url,{
    useMongoClient: true
});

connect
.then(db=>{
    console.log('Connected To Database Successfully');
})
.catch(err=>{
    throw err;
})
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser("jdfiudfeiufbei"));//signed cookie parser
app.use(session({
    name: 'admin',
    secret: 'jdfiudfeiufbei',
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}))

function auth (req, res, next) {        //Authorisation
    console.log(req.signedCookies);
    if(!req.session.user){
        console.log('Cookie not available');   
        var authHeader = req.headers.authorization;
        if(!authHeader){
            var err = new Error('Not Authenticated');
            err.status = 401;
            res.setHeader('WWW-Authenticate','Basic');
            return next(err);
        }
        console.log(authHeader);
        var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
        console.log(auth);
        var username = auth[0];
        var password = auth[1];
        console.log(username + ' ' + password);
        if(username === 'root' && password ==='root'){
            req.session.user = 'admin';
            next();
        }
        else{
            var err = new Error('Not Authenticated');
            err.status = 401;
            res.setHeader('WWW-Authenticate','Basic');
            return next(err);
        }
    }
    else{
        console.log('Cookie available');
        if(req.session.user === 'admin'){
            next();
        }
        else{
            var err = new Error('Not Authenticated');
            err.status = 401;
            res.setHeader('WWW-Authenticate','Basic');
            return next(err);
        }
    }
}
  
  app.use(auth);

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

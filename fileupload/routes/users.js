var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req,res,next)=>{
  User.register(new User({username:req.body.username}), req.body.password, (err)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-type', 'application/json');
      res.json({Status: 'Registration Failed', err: err});
    }
    else{
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json({Status: 'Registration Successful', _id: User._id});
      console.log(User._id);
      passport.authenticate('local');
    }
  })
})

router.post('/login', passport.authenticate('local'), (req,res)=>{
  var token = authenticate.getToken({_id: req.user._id});
  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.json({status: 'Logged in',token: token});
})

router.get('/logout',(req,res,next)=>{
  res.redirect('/users');
})

module.exports = router;

var express = require('express');
var router = express.Router();


function random(handler){
  return (req, res, next)=>{
    handler(req, res, next)
  }
}

/* GET home page. */
router.get('/', random(function(req, res, next) {
  res.render('index', { title: 'Express' });
}));

module.exports = router;

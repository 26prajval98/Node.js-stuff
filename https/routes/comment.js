var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');
var Comments = require('../models/comments');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', (req, res, next)=>{
    Comments.find({})
    .populate('uid')
    .then((Comments)=>{
        res.setHeader('Content-type','application/json');
        res.json({Comments: Comments});
    })
    .catch((err)=>{
        next(err);
    })
})

router.post('/', authenticate.verifyUser, (req, res, next)=>{
    comment = {};
    comment.comment = req.body.comment;
    comment.uid = req.user._id;
    Comments.create(comment)
    .then((comment)=>{
        res.setHeader('Content-type','application/json');
        res.json({comment: comment});
    })
});

module.exports = router;
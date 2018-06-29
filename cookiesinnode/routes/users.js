var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Users = require('../models/Users');
var express = require('express');
var bodyParser = require('body-parser');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter
.get('/',(req,res)=>{
    Users.find({})
    .then(people=>{
        res.json(people);
    })
    .catch(err=>{
        throw err;
    })
})
.post('/',(req,res)=>{
    Users.create(req.body)
    .then(person=>{
        console.log('Post successful\n'+person);
    })
    .catch(err=>{
        throw err;
    })
})

.get('/:userId',(req,res)=>{
    Users.find({_id: req.params.userId})
    .then(user=>{
        res.json(user);
        console.log(user);
        res.end();
    })
})

.delete('/:userId/:friendId',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params.friendId);
    Users.findOne({_id:req.params.userId})
    .then(user=>{
        if(user){
            user.Friends.id(req.params.friendId).remove(()=>{
                console.log('Successful');
            });
            user.save();
        }
    })
    .catch(err=>{
        throw err
    });
    res.end();
})
module.exports = userRouter;

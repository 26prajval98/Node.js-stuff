var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Schema = mongoose.Schema;

var friendsSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    friends:{
        type: Number,
        required: true,
        min:0
    },
    about:{
        type:String,
        required:true,
    }
},{
    timestamps : true
});

var userSchema = new Schema({
    Name:{
        type:String,
        required:true,
    },
    about:{
        type: String,
        required: true
    },
    friends:{
        type: Number,
        required: true,
        min:0
    },
    Friends: [friendsSchema]
});

var Users = mongoose.model('user',userSchema);
module.exports = Users;
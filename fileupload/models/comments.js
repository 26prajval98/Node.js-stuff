var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    comment :{
        type : String,
        required : true
    },
    uid : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    }
},{
    timestamps : true
});

var Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;
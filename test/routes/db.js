var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://aradhana18:aradhana2018@ds033196.mlab.com:33196/registration_individual_category1";

var obj;

MongoClient.connect(url).then((db)=>{
    console.log('Connected Peacefully');
    db.collection('I').find({})
})
.then((res)=>{
    obj = res;
    module.exports = obj; 
})
.catch((err)=>{
    throw err;
});




var mongoose = require('mongoose');
var utilsDB = require("./utilsDB");


mongoose.connect("mongodb://localhost:27017/endproject", { useNewUrlParser: true} , (err,db) => {
    var users = db.collection("users");
    users.countDocuments((err,count) => {
        if(count <= 0){
            utilsDB.sendDataToDb();
        }else{
            console.log("Collection has data")
        }
    })
});
var mongodb = mongoose.connection;
mongodb.once('error' , () => console.log('Connection Failed'));


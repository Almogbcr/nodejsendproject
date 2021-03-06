var mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
    userId:String,
    id: String,
    title : String,
    completed: {type:Boolean , default:false}
});

var postSchema = new mongoose.Schema({
    userId:String,
    id: String,
    title : String,
    body: String
});
var phoneSchema = new mongoose.Schema({
    userId:String,
    phoneType:String,
    phoneNumber:String

})
var userSchema = new mongoose.Schema({
    id: String,
    name: String,
    username: String,
    email: String,
    address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
    lat: String,
    lng: String
        }
    },
    posts:[postSchema],
    tasks:[taskSchema],
    phone: String,
    website: String,
    company: {
    name: String,
    catchPhrase: String,
    bs: String
    }
});
var User = mongoose.model("User" , userSchema);
var Post = mongoose.model("Post" , postSchema);
var Task = mongoose.model("Task" , taskSchema);
var Phone = mongoose.model("Phone" , phoneSchema);

var modelObj = {
    User,
    Post,
    Task,
    Phone
}

module.exports = modelObj;

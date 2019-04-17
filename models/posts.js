var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    userId:String,
    id: String,
    title : String,
    body: String
});

var posts = mongoose.model("posts" , postSchema);

module.exports = posts;

var mongoose = require('mongoose');
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
    phone: String,
    website: String,
    company: {
    name: String,
    catchPhrase: String,
    bs: String
    },
    posts:[],
    tasks:[]

});
var User = mongoose.model("Users" , userSchema);


module.exports = User;

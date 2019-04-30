var mongoose = require('mongoose');


//MongoDB
mongoose.connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true});
var db = mongoose.connection;
db.once('error' , () => console.log('Connection Failed'));

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/endproject", { useNewUrlParser: true});
var db = mongoose.connection;

db.once('open' , () => console.log('Connected'));
db.once('error' , () => console.log('Connection Failed'));
var mongoose = require('mongoose');
var seed = require('../seed');

mongoose.connect("mongodb://localhost:27017/endproject", { useNewUrlParser: true});
var mongodb = mongoose.connection;

mongodb.once('open' , () => console.log('Connected'));
mongodb.once('error' , () => console.log('Connection Failed'));

seed();

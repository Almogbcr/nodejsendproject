var express = require('express');
var bodyParser = require('body-parser');
var seedDB = require("./seed");

require("./configs");

var firstInit = true;

if(firstInit){
    firstInit = false;
    //seedDB.seedDB();
}


var usersRouter = require('./routes/users');


var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/" , usersRouter);

const PORT = 8000 || process.env.PORT

app.listen(PORT , () => {
    console.log("Server is running on Port: " + PORT)
})
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs-extra');
//var seed = require('./seed');
var createFiles = require("./configs/utilsFile");

require("./configs");

var usersRouter = require('./routes/users');

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

var path = 'changeLogs/'
fs.readdir(path,(err,files) => {
    if(files <= 0){
            createFiles();
    }else{
        console.log("Files already Exists");
    }
})


app.use("/" , usersRouter);

const PORT = 8000 || process.env.PORT

app.listen(PORT , () => {
    console.log("Server is running on Port: " + PORT)
})
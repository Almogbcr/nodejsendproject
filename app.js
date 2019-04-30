var express = require('express');
var bodyParser = require('body-parser');
var seed = require('./seed');


require("./configs/index");
seed();

var usersRoute = require('./routes/users');
var postsRouter = require("./routes/posts");

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


app.use("/" , usersRoute);
app.use("/" , postsRouter);

const PORT = 8000 || process.env.PORT

app.listen(PORT , () => {
    console.log("Server is running on Port: " + PORT)
})
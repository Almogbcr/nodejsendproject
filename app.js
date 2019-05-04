var express = require('express');
var bodyParser = require('body-parser');
var seed = require('./seed');


require("./configs/index");
seed();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require("./routes/posts");
var tasksRouter = require("./routes/tasks");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use("/" , indexRouter);
app.use("/user" , usersRouter);
app.use("/user" , postsRouter);
app.use("/user" , tasksRouter);

const PORT = 8000 || process.env.PORT

app.listen(PORT , () => {
    console.log("Server is running on Port: " + PORT)
})
var fetch = require('node-fetch');
var User = require('./models/users');
var Task = require('./models/tasks');
var Post = require('./models/posts');

var seed = {}

seed.seedDB = () => {
    User.deleteMany({} , (err,data) => {
        if(err){
            res.send(err);
        }else{
            Task.deleteMany({});
            Post.deleteMany({});
            getData();
        }
    });
}

function getData () {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        User.insertMany(data);
        console.log("Users Added to DB")
        } ,
        
    );
    getPosts();
    getTasks();
}
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        Post.insertMany(data);
        console.log("Posts Added to DB")
        }
    );
}
function getTasks () {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(data => {
        Task.insertMany(data);
        console.log("Tasks Added to DB")
        }
    );
}


module.exports = seed;

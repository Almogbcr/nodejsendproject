var axios = require('axios');
var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    userId:String,
    id: String,
    title : String,
    completed: Boolean
});


var postSchema = new mongoose.Schema({
    userId:String,
    id: String,
    title : String,
    body: String
});
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
    posts:[postSchema],
    tasks:[taskSchema],
    phone: String,
    website: String,
    company: {
    name: String,
    catchPhrase: String,
    bs: String
    }


});
var User = mongoose.model("Users" , userSchema);
var Post = mongoose.model("Post" , postSchema);
var Task = mongoose.model("Task" , taskSchema);


function getUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/Users')
}
function getPosts() {
    var promise = new Promise((res) => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(resp => {
            res(resp.data);
        })
    })
    return promise;
}

function getTasks() {
    var promise = new Promise((res) => {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(resp => {
            res(resp.data);
        })
    })
    return promise;
}
function checkDb(){
    User.countDocuments({} , (err,count) => {
        if(count <= 0){
            seed();
        }
    })
}

function seed() {
    getUsers().then(resp => {
    var userData = resp.data;
            User.create(userData , (err,users) => {
                getTasksData(users);
                getPostsData(users);
                console.log("Done");

        })
        
    })
}

function getPostsData(users){
    getPosts().then(res => {
        users.forEach((user) => {
                Post.create(res , (err,post) => {
                    post.forEach((p) => {
                        if(user.id === p.userId){
                            user.posts.push(p);
                        }
                    })
                    user.save();
                })

        })
    })
}
function getTasksData(users){
    getTasks().then(res => {
        users.forEach((user) => {
                Task.create(res , (err,task) => {
                    task.forEach((t) => {
                        if(user.id === t.userId){
                            user.tasks.push(t);
                        }
                    })
                })


        })
    })

}

module.exports = checkDb;

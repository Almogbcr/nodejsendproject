var axios = require('axios');
var model = require('./models/models');

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
    model.User.countDocuments({} , (err,count) => {
        if(count <= 0){
            seed();
        }
    })
}

function seed() {
    getUsers().then(resp => {
        var userData = resp.data;
        model.User.create(userData , (err,users) => {
                getTasksData(users);
                getPostsData(users);
                console.log("Done");
        })
    })
}

function getPostsData(users){
    getPosts().then(res => {
        users.forEach((user) => {
            model.Post.create(res , (err,post) => {
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
            model.Task.create(res , (err,task) => {
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
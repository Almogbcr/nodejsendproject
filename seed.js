var axios = require('axios');
var User = require('./models/Users');
var Task = require('./models/tasks');
var Post = require('./models/posts');

function getUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/Users')
}
function getPosts() {
    return axios.get('https://jsonplaceholder.typicode.com/Posts')
}
function seed() {
    getUsers().then(resp => {
        var users = [];
        users.push(resp.data);
        users.forEach((userData) => {
            User.create(userData , (err,usersData) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Users Added to DB");
                }
            });
        })
    })
    getPosts().then(resPost => {
        var postsData = [];
        postsData.push(resPost.data);
        postsData.forEach((postData) => {
            Post.create(postData , (err,pData) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Posts added to DB")
                }
            })
        })
    })
}



module.exports = seed;

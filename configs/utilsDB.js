var utils = require('./utils');
var model = require("../models/models");

var utilsDB = {}

utilsDB.getUsersData =() => {
    utils.getUsers().then(res => {
        model.User.create(res , (err,users) => {
                getTasksData(users);
                getPostsData(users);
                createPhonesData(users);
                console.log("Done");
        })
    })

}

function getPostsData(users){
    utils.getPosts().then(res => {
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
    utils.getTasks().then(res => {
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
function createPhonesData(users){
    users.forEach((user) => {
        var userID = user.id;
        var phoneNumberData = user.phone;
        model.Phone.create({
            userId : userID,
            phoneNumber : phoneNumberData
        })
    })
}

module.exports = utilsDB;
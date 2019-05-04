var utils = require('./utils');
var Model = require("../models");

var utilsDB = {}

utilsDB.insertPostToDb = () => {
    var promise = new Promise((res) => {
        Model.Post.countDocuments({} , (err,count) => {
            if(err){
                console.log("DB is not connected")
            }else if(count <= 0){
                utils.getPosts().then(postsData => {
                    Model.Post.insertMany(postsData , (err,posts) => {
                        res(posts);
                    })
                })
            }
        })
    })
    return promise;
}
utilsDB.insertTasksToDb = () => {
    var promise = new Promise((res) => {
        Model.Task.countDocuments({} , (err,count) => {
            if(err){
                console.log("DB is not connected")
            }else if(count <= 0){
                utils.getTasks().then(tasksData => {
                    Model.Task.insertMany(tasksData , (err,tasks) => {
                        res(tasks);
                    })
                })
            }
        })
    })
    return promise;
}

module.exports = utilsDB;
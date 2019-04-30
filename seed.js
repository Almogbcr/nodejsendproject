var utilsDb = require("./utils/utilsDB");
var utils = require("./utils/utils");
var Model = require("./models");
var fs = require('fs-extra');
var createFiles = require("./utils/utilsFile");

function seed(){
    var usersArr = [];
    utilsDb.insertPostToDb().then(() => {
        utilsDb.insertTasksToDb().then(() => {
            Model.User.countDocuments({} , (err,count) => {
                if(!err&&count <= 0){
                    utils.getUsers().then(usersData => {
                        usersArr.push(usersData);
                        usersArr.forEach(user => {
                            Model.User.insertMany(user , (err,uData) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    Model.Post.find({} , (err,foundPosts) => {
                                        Model.Task.find({} , (err,foundTasks) => {
                                            Model.User.find({} , (err,foundUsers) => {
                                                foundUsers.forEach(foundUser => {
                                                    foundPosts.forEach(foundPost => {
                                                        if(foundUser.id === foundPost.userId){
                                                            foundUser.posts.push(foundPost);
                                                        }
                                                    })
                                                    foundTasks.forEach(foundTask => {
                                                        if(foundUser.id === foundTask.userId){
                                                            foundUser.tasks.push(foundTask);
                                                        }
                                                    })
                                                    foundUser.save()
                                                })
                                            })
                                        })
                                    })
                                }
                            })
                            //Files
                            var path = 'changeLogs/'
                            fs.readdir(path,(err,files) => {
                                if(files <= 0 && !err){
                                    createFiles();
                                    createPhonesData();
                                }else{
                                    console.log("Files already Exists");
                                }
                            })
                        })
                    })
                }else{
                    console.log(err)
                }
            })
        })
    })
}

function createPhonesData(){
    Model.User.find({} , (err,users) =>{
        users.forEach(user => {
            var userID = user.id;
            var phoneNumber = user.phone;

            Model.Phone.create({
            userId : userID,
            phoneType: " ",
            phoneNumber : phoneNumber
            })
            user.save();
        })
    })
}

module.exports = seed;

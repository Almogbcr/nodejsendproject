var utilsDb = require("./utils/utilsDB");
var utils = require("./utils/utils");
var User = require("./models").User;
var Post = require("./models").Post;
var Task = require("./models").Task;
var Phone = require("./models").Phone;
var fs = require('fs-extra');
var File = require("./utils/utilsFile");

function seed(){
    var usersArr = [];
    utilsDb.insertPostToDb().then(() => {
        utilsDb.insertTasksToDb().then(() => {
            User.countDocuments({} , (err,count) => {
                if(!err&&count <= 0){
                    utils.getUsers().then(usersData => {
                        usersArr.push(usersData);
                        usersArr.forEach(user => {
                            User.insertMany(user , (err,uData) => {
                                if(err){
                                    console.log(err);
                                }else{
                                   Post.find({} , (err,foundPosts) => {
                                        Task.find({} , (err,foundTasks) => {
                                            User.find({} , (err,foundUsers) => {
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
                            var dir = 'changeLogs/'
                            if(!fs.exists(dir)) {
                                fs.mkdir(dir);
                                console.log("No Such Folder , Creating...");
                            }else{
                                fs.readdir(dir,(err,files) => {
                                    if(files <= 0 && !err){
                                        createPhonesData();
                                        File.createFileOnInit();
                                    }
                                })
                            }
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
    User.find({} , (err,users) =>{
        users.forEach(user => {
            var userID = user.id;
            var phoneNumber = user.phone;

            Phone.create({
            userId : userID,
            phoneType: " ",
            phoneNumber : phoneNumber
            })
            user.save();
        })
    })
}

module.exports = seed;

var utilsDb = require("./utils/utilsDB");
var utils = require("./utils/utils");
var User = require("./models").User;
var Post = require("./models").Post;
var Task = require("./models").Task;
var Phone = require("./models").Phone;
var fs = require('fs-extra');
var File = require("./utils/utilsFile");


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


function getFiles(users) {
    var dir = 'changeLogs/'
    if(!fs.existsSync(dir)) {
        fs.mkdir(dir);
        console.log("No Such Folder , Creating...");
        File.checkFiles(dir,users)
    }else if(fs.existsSync(dir)){
        File.checkFiles(dir,users)
    }else{
        console.log("Files Already Exist");
    }
}

async function seed(){
    await utilsDb.insertPostToDb()
    await utilsDb.insertTasksToDb();
    await seedUsersToDb();
    populateDataToUsers();                              

}

function seedUsersToDb(){
    var usersArr = [];
    User.countDocuments({} , (err,count) => {
        utils.getUsers().then(usersData => {
            if(!err&&count <= 0){
                usersArr.push(usersData);
                usersArr.forEach(user => {
                    User.insertMany(user , (err,users) => {
                        if(err){
                            console.log(err);
                        }else{
                            createPhonesData();
                            getFiles(users);
                        }
                    })
                })
            }
        })
    })
}

function populateDataToUsers(){
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
                    foundUser.save();
                })
            })
        })
    })
}

module.exports = seed;

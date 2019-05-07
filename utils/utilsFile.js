const jsonf = require('jsonfile');
var User = require("../models").User;
var Post = require("../models").Post;
var Task = require("../models").Task;
var Phone = require("../models").Phone;
var fs = require("fs-extra");
var File = {}
var date = new Date(Date.now());

File.renameFileAndUpdate = (user,userGuid,req) => {
    User.findById(userGuid , (err,newDataUser) => {
        var path = 'changeLogs/'
        var filename =  path+user.name+"-"+user._id+".json"
        var newFileName = path+newDataUser.name+"-"+newDataUser._id+".json"
        fs.rename(filename, newFileName, (err) =>{
            if(err){
                console.log(err);
            }else{
                var oldData = {
                    Name:user.name,
                    Email:user.email,
                    City:user.address.city
                }
                var newData = {
                Name:newDataUser.name,
                Email:newDataUser.email,
                City:newDataUser.address.city
                }
                File.writeNewLog(newDataUser,User,"Update",oldData,newData);
            }
        })
    })
}

File.getPostNewDataAndUpdate = (user,oldPost,postGuid) => {
    Post.findById(postGuid,(err,newDataPost) => {
        if(err){
            console.log(err);
        }else{
            var oldPostData = {
                title:oldPost.title,
                body:oldPost.body
            }
            var newPostData = {
                title:newDataPost.title,
                body:newDataPost.body
            }
            File.writeNewLog(user,Post,"Update",oldPostData,newPostData)
        }

    })
}

File.getTaskNewDataAndUpdate = (user,oldTask,taskGuid) => {
    Task.findById(taskGuid,(err,newDataTask) => {
        if(err){
            console.log(err);
        }else{
            var oldTaskData = {
                title:oldTask.title,
                body:oldTask.body
            }
            var newTaskData = {
                title:newDataTask.title,
                body:newDataTask.body
            }
            File.writeNewLog(user,Task,"Update",oldTaskData,newTaskData)
        }

    })
}

File.createFileOnInit = (users) => {
    users.forEach(user => {
        var obj = {
            userLogs:[{
                Data:User.modelName,
                Action:{
                    Date:date.toDateString(),
                    Name:"Create",
                    "New Data":"Id: " + user._id
                }
            }]
        }
        var path = 'changeLogs/'
        var filename =  path+user.name+"-"+user._id+".json"
        jsonf.writeFile(filename, obj , {spaces: 2}, (err) => {
            if(err){
                console.log(err)
            }
        })
    })
}

File.createFileOnUserCreate = (user) => {
    var obj = {
        userLogs:[{
            Data:User.modelName,
            Action:{
                Date:date.toDateString(),
                Name:"Create",
                "New Data":"Id: " + user._id
            }
        }]
    }
    var path = 'changeLogs/'
    var filename =  path+user.name+"-"+user._id+".json"
    jsonf.writeFile(filename, obj , {spaces: 2}, (err) => {
        if(err){
            console.log(err)
        }
    })
}

File.writeNewLog = (user,Model,actionName,oData,nData) => {
    var path = 'changeLogs/'
    var filename =  path+user.name+"-"+user._id+".json"
    jsonf.readFile(filename , (err,data) => {
        if(err){
            console.log(err);
        }else{
            var obj = data;
            obj.userLogs.push({
                    Data: Model.modelName,
                    Action:{
                        Date:date.toDateString(),
                        Name:actionName,
                        "Origianl Data":oData,
                        "New Data":nData
                    }
                })
            }
            jsonf.writeFile(filename, obj , {spaces: 2}, (err) => {
                if(err){
                    console.log(err)
                }
            })
        })
}

File.checkFiles = (dir,users) => {
    fs.readdir(dir,(err,files) => {
        if(files <= 0 && !err){
            File.createFileOnInit(users);
            console.log("Done");
        }else{
            console.log("Files Already Exist");
        }
    })
}


module.exports = File;
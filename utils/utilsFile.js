const jsonf = require('jsonfile');
var User = require("../models").User;
var fs = require("fs-extra");
var File = {}
var date = new Date(Date.now());


File.createFileOnInit = (users) => {
    users.forEach(user => {
        var obj = {
            userLogs:[{
                Data:User.modelName,
                Action:{
                    Date:date.toDateString(),
                    actionName:"Created",
                    "New Data":"Id: " + user._id + " ,Name: " + user.name
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
                "New Data":"Id: " + user._id + " ,Name: " + user.name
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
        console.log("Done");
        if(files <= 0 && !err){
            File.createFileOnInit(users);
        }else{
            console.log("Files Already Exist");
        }
    })
}


module.exports = File;
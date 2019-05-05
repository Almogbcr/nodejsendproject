const jsonf = require('jsonfile');
var User = require("../models").User;
var Task = require('../models').Task;
var Post = require('../models').Post;
var Phone = require('../models').Phone;

var File = {}
var date = new Date(Date.now());
var obj = {
    userLogs:[{
        Data:User.modelName,
        Action:{
            Date:date.toDateString(),
            name:"User Created"

        }
    }]
}

File.createFileOnInit = () => {
    User.find({} , (err,users) => {
        users.forEach((user) => {
            var path = 'changeLogs/'
            var filename =  path+user.name+"-"+user._id+".json"
            jsonf.writeFile(filename, obj , {spaces: 2}, (err) => {
                if(err){
                    console.log(err)
                }
            })
        })
    })
}

File.createFileOnUserCreate = (user) => {
            var path = 'changeLogs/'
            var filename =  path+user.name+"-"+user._id+".json"
            jsonf.writeFile(filename, obj , {spaces: 2}, (err) => {
                if(err){
                    console.log(err)
                }
            })

}

File.writeNewLog = (user,Model) => {
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
                        name:"Update "+ Model.modelName
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


module.exports = File;
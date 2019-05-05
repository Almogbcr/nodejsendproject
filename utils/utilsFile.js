const jsonf = require('jsonfile');
var User = require("../models").User;

var File = {}

File.createFileOnInit = () => {
    var date = new Date(Date.now());
    var obj = {
        userLogs:
            [{Data:User.modelName,
            Date:date.toDateString(),
            Action:"User Created"}]
    }

    User.find({} , (err,users) => {
        users.forEach((user) => {
            var path = 'changeLogs/'
            var filename =  path+user.name+"-"+user._id+".json"
            jsonf.writeFile(filename, obj , {spaces: 2 , flag:'a'}, (err) => {
                if(err){
                    console.log(err)
                }
            })
        })
    })
}

File.createFileOnUserCreate = (user) => {
    var date = new Date(Date.now());
    var obj = {
        userLogs:[{Data:User.modelName,
            Date:date.toDateString(),
            Action:"User Created"}]
    }
            var path = 'changeLogs/'
            var filename =  path+user.name+"-"+user._id+".json"
            jsonf.writeFile(filename, obj , {spaces: 2 , flag:'a'}, (err) => {
                if(err){
                    console.log(err)
                }
            })

}

File.readFile = () => {
    var promise = new Promise((resolve) => {
        var path = 'changeLogs/'
        var filename =  path+user.name+"-"+user._id+".json"
        jsonf.readFile(filename , (err,data) => {
            if(err){
                console.log(err)
            }else{
                resolve(data.data)
            }
        })
    })
    return promise;
}


module.exports = File;
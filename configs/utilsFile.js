const jsonf = require('jsonfile');
var model = require("../models/models");


function createFile() {
    var obj = {
            'Data' : " ",
            'Original Data' : " " ,
            'New Data' : "  "

    }
model.User.find({} , (err,users) => {
    users.forEach((user) => {
        var path = 'changeLogs/'
        var filename =  path+user.name+"-"+user._id+".json"
        jsonf.writeFile(filename, obj , {flag:'a' , EOL: '\r\n'}, (err) => {
            if(err){
                console.log(err)
            }
        })
    })
})
}


module.exports = createFile;
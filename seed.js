var model = require('./models/models');
var utilsDB = require('./configs/utilsDB');

function checkDb(){
    model.Post.countDocuments({} , (err,count) => {
        if(count <= 0){
            utilsDB.getUsersData();
        }else{
            console.log("Data is already presist");
        }
    })
}

module.exports = checkDb;
var express  = require('express');
var router = express.Router();
var User = require('../models').User;
var Post = require('../models').Post;
var File = require("../utils/utilsFile")
const jsonf = require('jsonfile');

var date = new Date(Date.now());

//Get all Users
router.route("/").get((req,res) => {
    User.find({} , (err,users) =>{
        if(err){
            return res.send(err)
        }else{
            return res.json(users);
        }
    });
});
router.route("/:id/file").get((req,res) => {
    User.findById(req.params.id , (err,user) =>{
        if(err){
            return res.send(err)
        }else{
            if(user === null){
                return res.send("No Such User");
            }else{
                File.writeNewLog(user,User,"Update","Old Data","new Data");
                return res.send("Log updated")
            }

        }
    });
});


module.exports = router;
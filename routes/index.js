var express  = require('express');
var router = express.Router();
var User = require('../models').User;
var File = require("../utils/utilsFile");
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




module.exports = router;
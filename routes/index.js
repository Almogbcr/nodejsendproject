var express  = require('express');
var router = express.Router();
var User = require('../models').User;


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
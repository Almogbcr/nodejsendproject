var express  = require('express');
var router = express.Router();
var Model = require('../models');


//Get all Users
router.route("/").get((req,res) => {
    Model.User.find({} , (err,users) =>{
        if(err){
            return res.send(err)
        }else{
            return res.json(users);
        }
    });
});



module.exports = router;
var express = require('express');
var router = express.Router();
var Model = require('../models');

router.route("/").get((req,res) => {
    Model.User.find({} , (err,users) =>{
        if(err){
            return res.send(err)
        }else{
            return res.json(users);
        }
    });
});

router.route("/:id").get((req,res) => {
    Model.User.findById(req.params.id , (err,foundUser) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(foundUser);
        }
    })
});

module.exports = router;



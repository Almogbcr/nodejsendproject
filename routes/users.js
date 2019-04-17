var express = require('express');
var router = express.Router()
var User = require('../models/users');

router.route("/").get((req,res) => {
    User.find({} , (err,users) =>{
        if(err){
            return res.send(err)
        }else{
            return res.json(users);
        }
    });
});

router.route("/:id").get((req,res) => {
    User.findById(req.params.id , (err,foundUser) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(foundUser);
        }
    })
});

router.route("/:id/posts").get((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(user.posts);
        }
    })
});

router.route("/:id/tasks").get((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(user.tasks);
        }
    })
});

module.exports = router;



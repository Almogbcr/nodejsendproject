var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var File = require("../utils/utilsFile");
var User = require('../models').User;
var Post = require('../models').Post;
var Task = require('../models').Task;


//Get Specific User by Id
router.route("/:id").get((req,res) => {
    User.findById(req.params.id , (err,foundUser) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(foundUser);
        }
    })
});

//Get all Posts of specific Users
router.route("/:id/posts").get((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(user.posts);
        }
    })
});

//Get all Tasks of specific Users
router.route("/:id/tasks").get((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err){
            return res.send(err)
        }else{
            return res.json(user.tasks);
        }
    })
});

//Create New User
router.route("/new").post((req,res) => {
    var guid = mongoose.Types.ObjectId();
    var newUser = new User({
        id:guid,
        name: req.body.name,
        email: req.body.email,
        address: {
            city: req.body.address.city,
        }
    })
    newUser.save();
    File.createFileOnUserCreate(newUser);
    return res.send("User Created");
})

//Update a User
router.route("/:id/edit").put((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err || user == null){
            return res.send("No Such User")
        }else{
            if(req.body.name == null || req.body.username == null || req.body.email == null || req.body.address.street == null
                || req.body.address.suite == null || req.body.address.city == null || req.body.address.zipcode == null || req.body.address.geo.lat == null 
                || req.body.address.geo.lng == null || req.body.phone == null || req.body.website == null || req.body.company.name == null 
                || req.body.company.catchPhrase == null || req.body.company.bs == null ){
                    doNotChange(user);
                    return res.send("Update Failed , One or more of the fields are missing");
                }else{
                    User.findByIdAndUpdate(req.params.id ,{
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        address: {
                        street: req.body.address.street,
                        suite: req.body.address.suite,
                        city: req.body.address.city,
                        zipcode: req.body.address.zipcode,
                            geo:{
                                lat: req.body.address.geo.lat,
                                lng: req.body.address.geo.lng,
                            }
                        },
                        phone: req.body.phone,
                        website: req.body.website,
                        company:{
                            name: req.body.company.name,
                            catchPhrase: req.body.company.catchPhrase,
                            bs: req.body.company.bs
                        }
                    } , (err,updatedUser) => {
                            if(err){
                                console.log(err)
                            }else{
                                var userGuid = updatedUser._id;
                                File.renameFileAndUpdate(user,userGuid,req);
                                return res.send("Updated");
                            }
                        })
                    }
 
        }
    
    })

})

router.route("/:id").delete((req,res) => {
    User.findByIdAndDelete(req.params.id , (err,deletedUser) => {
        if(err){
            console.log(err)
        }else{
            Post.deleteMany({userId : deletedUser.id} , (err,deleted) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Posts Deleted")
                }
            })
            Task.deleteMany({userId : deletedUser.id} , (err,deleted) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Tasks Deleted")
                }
            })
            var oldData = {
                Name:deletedUser.name,
                Id:deletedUser._id
            }
            File.writeNewLog(deletedUser,User,"Delete",oldData,"User Deleted")
            return res.send("Deleted");
        }
    })
})

function doNotChange(user) {
    user.name = user.name;
    user.username = user.username;
    user.email = user.email;
    user.address.street = user.address.street;
    user.address.suite = user.address.suite;
    user.address.city = user.address.city;
    user.address.zipcode = user.address.zipcode;
    user.address.geo.lat = user.address.geo.lat;
    user.address.geo.lng = user.address.geo.lng;
    user.phone = user.phone;
    user.website = user.website;
    user.companyName = user.company.name;
    user.company.catchPhrase = user.company.catchPhrase;
    user.company.bs = user.company.bs;
}




module.exports = router;
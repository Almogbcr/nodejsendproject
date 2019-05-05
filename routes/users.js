var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var File = require("../utils/utilsFile");
var User = require('../models').User;
var Post = require('../models').Post;
var Task = require('../models').Task;

var date = new Date(Date.now());

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
            },
        })
    newUser.save();
    File.createFileOnUserCreate(newUser);
    return res.send("User Created");
})

//Update a User
router.route("/:id").put((req,res) => {
    if(req.body.name == null 
        || req.body.username == null 
        || req.body.email == null 
        || req.body.address.street == null
        || req.body.address.suite == null 
        || req.body.address.city == null 
        || req.body.address.zipcode == null 
        || req.body.address.geo.lat == null 
        || req.body.address.geo.lng == null 
        || req.body.phone == null 
        || req.body.website == null 
        || req.body.company.name == null 
        || req.body.company.catchPhrase == null 
        || req.body.company.bs == null 
        ){
   
            return res.send("One or more of the data is missing.\nPlease fill the data correctly.\nData has not been modified\n" + 
            "Example:\n"+
            `{ 
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address":{ 
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": { 
                        "lat": "-37.3159", 
                        "lng": "81.1496"
                        } 
                    },
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company":{ 
                        "name": "Romaguera-Crona",
                        "catchPhrase": "Multi-layered client-server neural-net",
                        "bs": "harness real-time e-markets"
                    } 
            }`)
    }else{
        console.log(req.body);
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
                return res.send("Updated");
                }
            })
        }
    })

router.route("/:id").delete((req,res) => {
    User.findOneAndDelete(req.params.id , (err,deletedUser) => {
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
            return res.send("Deleted");
        }
    })
})


module.exports = router;
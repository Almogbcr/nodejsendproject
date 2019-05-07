var express  = require('express');
var router = express.Router();
var Post = require("../models").Post;
var User = require("../models").User;
var mongoose = require('mongoose')
var File = require("../utils/utilsFile");


//Create New Post
router.route("/:id/post/new").post((req,res) => {
    var guid = mongoose.Types.ObjectId();
    User.findById(req.params.id , (err,user) => {
        const newPost = new Post({
        userId:user.id,
        id: guid,
        title : req.body.title,
        body: req.body.body
        });
    newPost.save();
    user.posts.push(newPost);
    user.save();
    var newData = {
        title:newPost.title,
        body:newPost.body
    };
    return res.send("New Post created");
    })
})

//Edit Post
router.route("/:id/post/:post_id").put((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(req.body.title == null || req.body.body == null){
            return res.send("One or more of the data is missing.\nPlease fill the data correctly.\nData has not been modified\n" + 
            "Example:\n"+
            `{"title":"post title",
              "body": "text"}`)
        }else{
            Post.findByIdAndUpdate(req.params.post_id , {
                title: req.body.title,
                body: req.body.body
            } , (err,updatedPost) => {
                if(err){
                    console.log(err)
                }else{
                    user.posts.length = 0;
                    Post.find({} , (err,posts) => {
                        posts.forEach(post => {
                            if(user.id === post.userId){
                                user.posts.push(post)
                            }
                        })
                        user.save();
                        File.getPostNewDataAndUpdate(user,updatedPost,updatedPost._id);
                        return res.send("Post Updated")
                    })
                }
            })
        }

    })
})

//Delete Post
router.route("/:id/post/:post_id").delete((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err || req.params.id == null){
            return res.send("No Such User");
        }else{
            Post.findOne({_id:req.params.post_id} , (err,foundPost) => {
                if(err && foundPost._id === null){
                    return res.send("No Such Post")
                }else{
                    Post.findByIdAndDelete(req.params.post_id , (err,deletePost) => {
                        if(err){
                            console.log(err)
                        }else{
                            user.posts.length = 0;
                            Post.find({} , (err,posts) => {
                                posts.forEach(post => {
                                    if(user.id === post.userId){
                                        user.posts.push(post)
                                    }
                                })
                                var oldData = {
                                    Title:deletePost.title,
                                    Tody:deletePost.body
                                }

                                user.save();
                                File.writeNewLog(user,Post,"Delete",oldData,"Post Deleted");
                                return res.send("Post Deleted");
                            })
                        }
                    })
                }
            })
        }       
    })
})


module.exports = router;
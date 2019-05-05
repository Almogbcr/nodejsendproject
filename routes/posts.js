var express  = require('express');
var router = express.Router();
var Post = require("../models").Post;
var User = require("../models").User;
var mongoose = require('mongoose')


//Create New Post
router.route("/:id/posts/new").post((req,res) => {
    Post.find({} , (err,posts) => {
        if(err){
            console.log(err)
        }else{
            var guid = mongoose.Types.ObjectId();
                    User.findById(req.params.id , (err,user) => {
                        console.log(user);
                        const newPost = new Post({
                            userId:user.id,
                            id: guid,
                            title : req.body.title,
                            body: req.body.body
                        });
                        newPost.save();
                        user.posts.push(newPost);
                        user.save();
                        return res.send(newPost._id)
                    })
        }
    })
})

//Edit Post
router.route("/:id/posts/:post_id").put((req,res) => {
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
                        return res.send("Post Updated")
                    })
                }
            })
        }

    })
})

//Delete Post
router.route("/:id/posts/:post_id").delete((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err){
            console.log(err)
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
                                user.save();
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
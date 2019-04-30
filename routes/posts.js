var express  = require('express');
var router = express.Router();
var Model = require("../models");

//Gets All Post of given ID
router.route("/:id/posts").get((req,res) => {
        Model.User.findById(req.params.id , (err,user) => {
            if(err){
                return res.send(err)
            }else{
                return res.json(user.posts);
            }
        })
});



module.exports = router;
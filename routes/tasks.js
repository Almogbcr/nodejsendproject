var express  = require('express');
var router = express.Router();
var Task = require("../models").Task;
var User = require("../models").User;
var mongoose = require('mongoose')

//Create New Task
router.route("/:id/tasks/new").post((req,res) => {
    Task.find({} , (err,tasks) => {
        if(err){
            console.log(err)
        }else{
            var guid = mongoose.Types.ObjectId().toString();
            User.findById(req.params.id , (err,user) => {
                const newTask = new Task({
                    userId:user.id,
                    id: guid,
                    title : req.body.title,
                });
                newTask.save();
                user.tasks.push(newTask);
                user.save();
                return res.send(newTask._id)
            })
        }
    })
})

//Edit Task
router.route("/:id/tasks/:task_id").put((req,res) => {
    console.log(req.body);
    User.findById(req.params.id , (err,user) => {
        if(req.body.title == null || req.body.completed == null){
            return res.send("One or more of the data is missing.\nPlease fill the data correctly.\nData has not been modified\n" + 
            "Example:\n"+
            `{"title":"newTodo",
              "completed":true}`
            )
        }else{
            Task.findByIdAndUpdate(req.params.task_id , {
                title: req.body.title,
                completed: req.body.completed
            } , (err,updatedPost) => {
                if(err){
                    console.log(err)
                }else{
                    user.tasks.length = 0;
                    Task.find({} , (err,tasks) => {
                        tasks.forEach(task => {
                            if(user.id === task.userId){
                                user.tasks.push(task)
                            }
                        })
                        user.save();
                        return res.send("Task Updated")
                    })
                }
            })
        }

    })
})


//Delete Task
router.route("/:id/tasks/:task_id").delete((req,res) => {
    User.findById(req.params.id , (err,user) => {
        if(err){
            console.log(err)
        }else{
            Task.findOne({_id:req.params.task_id} , (err,foundTask) => {
                if(err && foundTask._id === null){
                    return res.send("No Such Task")
                }else{
                    Task.findByIdAndDelete(req.params.task_id , (err,deletedTask) => {
                        if(err){
                            console.log(err)
                        }else{
                            user.tasks.length = 0;
                            Task.find({} , (err,tasks) => {
                                tasks.forEach(task => {
                                    if(user.id === tasks.userId){
                                        user.tasks.push(task)
                                    }
                                })
                                user.save();
                                return res.send("Task Deleted");
                            })
                        }
                    })
                }
            })
        }       
    })
})

module.exports = router;
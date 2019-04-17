var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    userId:String,
    id: String,
    title : String,
    completed: Boolean
});
var tasks = mongoose.model("Tasks" , taskSchema);

module.exports = tasks;

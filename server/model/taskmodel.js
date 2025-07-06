const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    task:{
        type : String,
        required : true,
    },
    status:{
        type : Boolean,
        required : true,
        default : false,
    },
    createdAt:{
        type : Date,
        required : true,
    },
    priority:{
        type : String,
        required : true,
        default : "blue",
    },

})
const taskMode = mongoose.model('Task',taskSchema);
module.exports = taskMode;

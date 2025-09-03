const mongoose=require("mongoose");
const TodoSchema=mongoose.Schema({
    task:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
    deadline:{
        type:Date,
        required:true
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    }
},{timestramps:true});
module.exports=mongoose.model('Todo',TodoSchema);
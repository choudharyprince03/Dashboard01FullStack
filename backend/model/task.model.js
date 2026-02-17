import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{ 
        type: String, 
        required:true, 
        trim: true, 
        minLength:3
    },
    description:{
        type: String, 
        required: true,
        trim: true
    },
    status:{
        type:String, 
        required: true,
        enum: ["todo", "in-progress", "blocked", "done"],
        default: "todo"
    },
    priority:{
        type: String, 
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    assignee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true 
    },
    // team: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Team",
    //     required: true
    // },
    dueDate:{
         type: Date 
    }},
    {timestamps: true}
); 

taskSchema.index({assignee:1}); 
taskSchema.index({status:1, createdAt: 1})
taskSchema.index

export default mongoose.model("Task",taskSchema); 
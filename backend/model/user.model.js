import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
        required:true, 
    },
    email:{
        type: String, 
        unique: true,
        required:true,
        lowercase:true
    },
    password:{
        type: String, 
        required:true
    }, 
    role:{
        type: String, 
        enum:["user","manager","admin"],
        default:"user"
    },
    createdAt: { type: Date, default: Date.now },
    }, 
{ timestamps: true }
); 


export default mongoose.model("User",UserSchema); 
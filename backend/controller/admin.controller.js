

import userModel from "../model/user.model.js";
import AppError from "../utils/appError.js";

//

const promoteUser = async (req,res,next)=>{
        try {
            const userId = req.params.id; 
            if(!userId){
                return next (new AppError(400, "Invalid userID!"))
            }
            const user = await userModel.findById(userId); 
            if(!user){
                return next(new AppError(404,"User not found.")); 
            }
            
            if(user.role==="admin"){
                return next(new AppError(400, "User is already an admin"));
            }
    
            if (user.role === "user") {
                user.role = "manager";
            } 
            else if (user.role === "manager") {
                user.role = "admin";
            }
 
    
            await user.save(); 
            console.log("the user has been updated: ", user)
            
            res.status(200).json({
                success: true, 
                message: `User promoted to ${user.role}.User must re-login for changes to apply.x`
            }); 
        } catch (error) {
            next(error); 
        }
    }


    const getAllUser = async(req,res,next)=>{
        try {
            const users = await userModel.find().select("-password");; 

            res.status(200).json({
                message: "These are all the users",
                count: users.length,
                users
            }); 
        } catch (error) {
            next(error); 
        }

    }

     export  {
        getAllUser,
        promoteUser
    }
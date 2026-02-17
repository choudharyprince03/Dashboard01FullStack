
import AppError from "../utils/appError.js"
import UserSchema from "../model/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import rolePermissions from "../config/permissions.js";


const signUp =async(req,res,next)=>{
    try {
        const {name,email,password} = req.body; 
    
        if(!name ||!email ||!password){
            return next (new AppError(400,"all fields are required"))
        }
    
        const existingUser = await UserSchema.findOne({email}); 
        if(existingUser){
            return next(new AppError(409,"Email already registered")); 
        }
    
        const hashedPassword = await bcrypt.hash(password,10)
    
        const account = await UserSchema.create({
            name,
            email,
            password: hashedPassword, 
            role: "user"
        })
    
        const safeUserData = account.toObject(); 
        delete safeUserData.password; 
    
        res.status(201).json({
            message:"Account created successfully",
            user: safeUserData
        })
    } catch (error) {
        next(error); 
    }
}

const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body; 
        if(!email || !password ){
            return next(new AppError(400,"All fields are required")); 
        }
        const userAccount = await UserSchema.findOne({email});

        if(!userAccount){
            return next(new AppError(401,"Invalid credentials"))
        };

        const match = await bcrypt.compare(password,userAccount.password);

        if(!match){
            return next(new AppError(401,"Invalid credentials"))
        }

        const role = userAccount.role; 
        const permissions = rolePermissions[role] || []; 

        const token = jwt.sign(
            {
                id: userAccount._id,
                role:userAccount.role,
                permissions
            },

            process.env.JWT_SECRET,
             {expiresIn: "1d"}
        )

        const{password: _,...safeUser} = userAccount.toObject(); 

        res.json({
            token, 
            user:safeUser,
            permissions
        })

    } catch (error) {
        next(error); 
    }
}

const getProfile = async(req,res,next)=>{
    try {
        const user = await UserSchema.findById(req.user.id).select("-password");
        
        const role = user.role; 
        const permissions = rolePermissions[role] || []; 

        if(!user){
            return next(new AppError(404, "User not found"))
        }
        res.json({
                user,
                permissions: permissions
        })
    } catch (error) {
        next(error); 
    }
}

export {
    signUp,
    login,
    getProfile
}
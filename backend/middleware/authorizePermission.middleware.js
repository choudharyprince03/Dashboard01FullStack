import AppError from "../utils/appError.js"

const authorizePermission=(requiredPermission)=>{

    return (req,res,next)=>{
        if(!req.user ||!req.user.permissions){
            return next(new AppError(401, "User not authenticated"));
        }

        if(!req.user.permissions.includes(requiredPermission)){
            return next(new AppError(403,"Access Denied. You are not authorized"))
        }
        next(); 
    }
}

export default authorizePermission; 


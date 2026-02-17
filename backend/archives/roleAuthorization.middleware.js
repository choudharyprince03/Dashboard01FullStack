import AppError from "../utils/appError.js"

const authorizeRole =(...allowedRoles)=>{
    return(req,res,next)=>{
        if (!req.user || !req.user.role) {
            return next(new AppError(401, "User not authenticated"));
         }
        if(!allowedRoles.includes(req.user.role)){
            return next(new AppError(403,"Access Denied. You are not authorized"))
        }
        next(); 
    }
}
export default authorizeRole; 
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{
    
    const authHeaders = req.headers.authorization;; 

    if(!authHeaders|| !authHeaders.startsWith('Bearer ')){
        return next(new AppError(401,"Not authorized"))
    }; 

    const token = authHeaders.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        //auth middleware k paas token decode hota hai, 
        //aur token k andar k objects yaha aate hai! 
        
        req.user = {
            id: decoded.id,
            role: decoded.role,
            permissions : decoded.permissions ||[],
        }

        next(); 
    } catch (error) {
        return next(new AppError(401, "Invalid or expired token"));
    }
}

export default authMiddleware;
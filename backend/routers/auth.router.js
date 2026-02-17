import { Router } from "express";
import { login, signUp,getProfile } from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router(); 

router.post("/signup",signUp);
router.post("/login",login); 
router.get(
            "/profile", 
            authMiddleware, 
            getProfile  );  

// router.post("/logout",(req,res)=>{
//     res.json({
//         message:"The user has been logged out"
//     }); 
// }); 

export default router; 

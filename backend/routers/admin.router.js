import {Router} from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import {promoteUser,getAllUser} from "../controller/admin.controller.js"
import authorizePermission from "../middleware/authorizePermission.middleware.js";

const router = Router();

//admin controller 

router.get(
    '/users',
    authMiddleware,
    authorizePermission("view_users"),
    getAllUser
)
router.patch(
    '/users/promote/:id',
    authMiddleware,
    authorizePermission("promote_users"),
    promoteUser
); 

export default router ; 

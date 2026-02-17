import {Router} from "express"
import {
    createTask,
    getMyTasks,
    updateTaskStatus,
    deleteTask}  from "../controller/task.controller.js"
import authorizePermission from "../middleware/authorizePermission.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router (); 

router.post(
    '/',
    authMiddleware,
    authorizePermission("create_task"),
    createTask
),
router.get(
    "/my",
    authMiddleware,
    authorizePermission("view_tasks"),
    getMyTasks
)
router.patch(
    "/:taskId/status",
    authMiddleware,
    authorizePermission("update_task_status"),
    updateTaskStatus
)
router.delete(
    '/:taskId',
    authMiddleware,
    authorizePermission("delete_task"),
    deleteTask
)

export default router; 



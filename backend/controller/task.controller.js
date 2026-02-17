import taskModel from "../model/task.model.js"
import AppError from "../utils/appError.js";
import logActivity from "../utils/logActivity.js";

const createTask= async(req,res,next)=>{
    try {
        const {
            title, 
            description, 
            priority, 
            dueDate,
        } = req.body;
    
        const task = await taskModel.create({
            title, 
            description, 
            priority, 
            dueDate,
            assignee: req.user.id, 
            creator: req.user.id,
        }); 

        await logActivity({
            action:"TASK_CREATED",
            actor:req.user.id, 
            task: task._id,
            metadata:{
                priority
            }
        })
        res.status(201).json({
            message: "Task created successfully",
            task
        })
    } catch (error) {
        next(error); 
    }

}; 

const getMyTasks=async(req,res,next)=>{
    try {
        const tasks = await taskModel
            .find({assignee:req.user.id})
            .sort({createdAt:-1}); 

        res.json({
            tasks
        }); 

    } catch (error) {
        next(error); 
    }
}; 


// const getTeamTasks=async(req,res,next)=>{
//     try {
//         const tasks = await taskModel
//         .find({ team: req.user.team })
//         .populate("assignee", "name email"); 
        
//         res.json({
//             tasks
//         })
//     } catch (error) {
//         next(error); 
//     }


// };

const updateTaskStatus=async(req,res,next)=>{

    try {
        const {taskId} = req.params; 
        const {status} = req.body; 
        
        const task = await taskModel.findById(taskId); 
        if(!task){
            return next(new AppError(404,"Task not found")); 
        }
        if(task.assignee.toString()!== req.user.id){
            return next(new AppError(403, "You cannot update this task"));
        }

        const oldStatus = task.status; 
    
        task.status = status ; 
        await task.save(); 
        
        await logActivity({
            action:"TASK_STATUS_UPDATED",
            actor: req.user.id,
            task: task._id,
            metadata: {
                from: oldStatus,
                to: status 
            }
        })
        res.json({
            message: "Task status updated",
            task 
        })
    } catch (error) {
        next(error); 
    }


}; 
//admin 
const getAllTasks=async(req,res,next)=>{
    try {
        const task = await taskModel.find()
        .populate("assignee", "name")
        .populate("creator", "name");

        res.json({
            task
         });

    } catch (error) {
        next(error); 
    }
}; 

const deleteTask = async(req,res,next)=>{
    try {
        const {taskId} = req.params;
        const task = await taskModel.findById(taskId); 
        if(!task){
            return next(new AppError(404,"Task not found")); 
        }
        if(task.assignee.toString()!==req.user.id){
            return next(new AppError(403,"You cannot delete this task"));
        }
        await task.remove(); 
        await logActivity({
            action:"TASK_DELETED",
             actor:req.user.id, 
             task: task._id,
        })
        res.json({
            message: "Task deleted successfully"
        })
    } catch (error) {
        next(error); 
    }
}

export {
    createTask,
    getMyTasks,
    // getTeamTasks,
    updateTaskStatus,
    getAllTasks,
    deleteTask
}



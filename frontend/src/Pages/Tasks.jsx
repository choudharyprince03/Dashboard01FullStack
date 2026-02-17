import { useState,useEffect } from "react"
import {createTask, getTasks,updateTasks,deleteTasks } from "../api/task.api"
import TaskList from "../components/Tasks/TaskList";
import { PERMISSIONS } from "../utils/Permissions";
import useAuth from '../auth/useAuth'; 
import usePermission from "../hooks/usePermission";
import TaskForm from "../components/Tasks/TaskForm";

const Tasks = ()=>{
    const [tasks,setTasks]= useState([]); 
    const [loading, setLoading]= useState(true);  
    const {user} = useAuth(); 

    
    
    //loadTasks on refresh
    useEffect(()=>{
        //fetch tasks on every refresh 
        const loadTasks = async()=>{
       try {
         const taskRes = await getTasks(); 
         setTasks(taskRes.data.tasks);
       } catch (err) {
            console.error(err)
       } finally{
        setLoading(false);
       }
    }; 

        loadTasks(); 
    },[]); 

    //handle create, update, delete, get 
    const handleCreate = async(data)=>{
       const res = await createTask(data); 
        setTasks((prev)=>[res.data.task, ...prev]); 
    }
    const handleStatusUpdate =async(id,status)=>{
        const res = await updateTasks(id,{status}); 
        setTasks((prev)=>[res.data.task, ...prev]); 
    }
    const handleDelete =async(id)=>{
        await deleteTasks(id); 
        setTasks((prev)=>[res.data.task, ...prev]);  
    }; 

    //permissions 
    const canCreateTask = usePermission(PERMISSIONS.CREATE_TASK);
    const canUpdateStatus = usePermission(PERMISSIONS.UPDATE_TASK_STATUS); 
    const canDeleteTask = usePermission(PERMISSIONS.DELETE_TASK); 

    if(loading){
        return<div className="text-white">Loading...</div>; 
    }

    return(
        <div className="space-y-6">
           {canCreateTask &&  <TaskForm onCreate={handleCreate} />}
            
            <TaskList
                tasks={tasks}
                canUpdate = {canUpdateStatus}
                canDelete = {canDeleteTask}

                onStatusChange={handleStatusUpdate}
                onDelete={handleDelete}
            />
        </div>
    )
}
export default Tasks; 
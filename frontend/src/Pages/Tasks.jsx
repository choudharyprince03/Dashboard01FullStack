import { useState, useEffect } from "react"
import { createTask, getTasks, updateTasks, deleteTasks } from "../api/task.api"
import TaskList from "../components/Tasks/TaskList";
import { PERMISSIONS } from "../utils/Permissions";
import useAuth from '../auth/useAuth'; 
import usePermission from "../hooks/usePermission";
import TaskForm from "../components/Tasks/TaskForm";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(true);  
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth(); 

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const taskRes = await getTasks(); 
                setTasks(taskRes.data.tasks);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        }; 
        loadTasks(); 
    }, []); 

    const handleCreate = async (data) => {
        const res = await createTask(data); 
        setTasks((prev) => [res.data.task, ...prev]); 
        setShowForm(false);
    }
    const handleStatusUpdate = async (id, status) => {
        const res = await updateTasks(id, {status}); 
        setTasks((prev) => prev.map(task => task._id === id ? res.data.task : task)); 
    }
    const handleDelete = async (id) => {
        await deleteTasks(id); 
        setTasks((prev) => prev.filter(task => task._id !== id));  
    }; 

    const canCreateTask = usePermission(PERMISSIONS.CREATE_TASK);
    const canUpdateStatus = usePermission(PERMISSIONS.UPDATE_TASK_STATUS); 
    const canDeleteTask = usePermission(PERMISSIONS.DELETE_TASK); 

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-900 dark:text-white space-y-4 transition-colors">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-500" />
            </div>
        ); 
    }

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 transition-colors">
                        Tasks
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors">Manage and track your project deliverables.</p>
                </div>
                {canCreateTask && (
                    <button 
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(37,99,235,0.3)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95"
                    >
                        <Plus className={`w-5 h-5 transition-transform ${showForm ? "rotate-45" : ""}`} />
                        {showForm ? "Cancel" : "New Task"}
                    </button>
                )}
            </div>

            {canCreateTask && showForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="overflow-hidden"
                >
                    <TaskForm onCreate={handleCreate} />
                </motion.div>
            )}
            
            <div className="bg-white/80 dark:bg-[#121A2F]/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-md dark:shadow-xl overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b border-gray-200 dark:border-white/5 transition-colors">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">All Tasks</h2>
                </div>
                <div className="p-6">
                    <TaskList
                        tasks={tasks}
                        canUpdate={canUpdateStatus}
                        canDelete={canDeleteTask}
                        onStatusChange={handleStatusUpdate}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default Tasks; 
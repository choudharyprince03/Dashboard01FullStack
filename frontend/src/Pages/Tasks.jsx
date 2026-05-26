import { useState, useEffect } from "react"
import { getTasks } from "../api/task.api"
import TaskManager from "../components/Tasks/TaskManager";
import { Loader2 } from "lucide-react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(true);  

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

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-[#2C3040] space-y-4 transition-colors">
                <Loader2 className="w-10 h-10 animate-spin text-[#6B8F71]" />
            </div>
        ); 
    }

    return (
        <div className="space-y-8 pb-10">
            <TaskManager
                tasks={tasks}
                setTasks={setTasks}
                title="All Tasks"
                description="Manage and track your project deliverables."
                showPageHeader
            />
        </div>
    )
}

export default Tasks; 

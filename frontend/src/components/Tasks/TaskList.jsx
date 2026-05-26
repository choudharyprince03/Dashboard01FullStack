import TaskItem from "./TaskItem";
import { ListPlus } from "lucide-react";

const TaskList = ({
    tasks,
    canUpdate,
    canDelete,
    onStatusChange,
    onDelete
}) => {

    if (!tasks.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center transition-colors">
                <div className="w-16 h-16 rounded-full bg-[#EDEAE2] flex items-center justify-center mb-4 transition-colors">
                    <ListPlus className="w-8 h-8 text-[#8A8F9E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C3040] mb-2 transition-colors">No tasks found</h3>
                <p className="text-[#7B8190] text-sm max-w-sm transition-colors">
                    There are currently no tasks to display. Create a new task to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    canUpdate={canUpdate}
                    canDelete={canDelete}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList; 

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
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 transition-colors">
                    <ListPlus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors">No tasks found</h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm max-w-sm transition-colors">
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
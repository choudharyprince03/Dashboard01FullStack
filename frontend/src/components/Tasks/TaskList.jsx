import TaskItem from "./TaskItem";


const TaskList=({
    tasks,
    canUpdate,
    canDelete,
    onStatusChange,
    onDelete    })=>    {

    if (!tasks.length) {
        return (
            <div className="text-gray-400 text-sm">
                No tasks available.
            </div>
        );
    }

    return(

     <div className="space-y-4">
        {tasks.map (task => (
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
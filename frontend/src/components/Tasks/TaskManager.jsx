import { useState } from "react";
import { Plus } from "lucide-react";
import { createTask, updateTasks, deleteTasks } from "../../api/task.api";
import usePermission from "../../hooks/usePermission";
import { PERMISSIONS } from "../../utils/Permissions";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskManager = ({
    tasks,
    setTasks,
    title = "All Tasks",
    listTitle = "All Tasks",
    description,
    showPageHeader = false,
}) => {
    const [showForm, setShowForm] = useState(false);

    const canCreateTask = usePermission(PERMISSIONS.CREATE_TASK);
    const canUpdateStatus = usePermission(PERMISSIONS.UPDATE_TASK_STATUS);
    const canDeleteTask = usePermission(PERMISSIONS.DELETE_TASK);

    const handleCreate = async (data) => {
        const res = await createTask(data);
        setTasks((prev) => [res.data.task, ...prev]);
        setShowForm(false);
    };

    const handleStatusUpdate = async (id, status) => {
        const res = await updateTasks(id, { status });
        setTasks((prev) => prev.map((task) => task._id === id ? res.data.task : task));
    };

    const handleDelete = async (id) => {
        await deleteTasks(id);
        setTasks((prev) => prev.filter((task) => task._id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    {showPageHeader ? (
                        <h1 className="text-3xl font-bold text-[#2C3040] transition-colors">
                            Tasks
                        </h1>
                    ) : (
                        <h2 className="text-lg font-semibold text-[#2C3040] transition-colors">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-[#7B8190] mt-1 transition-colors">
                            {description}
                        </p>
                    )}
                </div>

                {canCreateTask && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center justify-center gap-2 bg-[#6B8F71] hover:bg-[#5F8065] text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
                    >
                        <Plus className={`w-5 h-5 transition-transform ${showForm ? "rotate-45" : ""}`} />
                        {showForm ? "Cancel" : "New Task"}
                    </button>
                )}
            </div>

            {canCreateTask && showForm && (
                <div className="overflow-hidden">
                    <TaskForm onCreate={handleCreate} />
                </div>
            )}

            <div className="bg-[#F7F6F2]/95 backdrop-blur-md rounded-2xl border border-[#D8D3C7] shadow-sm overflow-hidden transition-colors duration-300">
                <div className="p-6 border-b border-[#D8D3C7] transition-colors">
                    <h2 className="text-lg font-semibold text-[#2C3040] transition-colors">
                        {listTitle}
                    </h2>
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
    );
};

export default TaskManager;

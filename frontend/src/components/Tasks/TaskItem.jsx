const TaskItem = ({
  task,
  canUpdate,
  canDelete,
  onStatusChange,
  onDelete
}) => {

  return (
    <div className="bg-gray-800 p-5 rounded-lg flex justify-between items-center border border-gray-700">

      <div>
        <h4 className="text-white font-semibold">
          {task.title}
        </h4>

        <p className="text-gray-400 text-sm mt-1">
          {task.description}
        </p>

        <div className="flex gap-3 mt-2 text-xs text-gray-400">
          {task.priority && (
            <span className="capitalize">
              Priority: {task.priority}
            </span>
          )}

          {task.dueDate && (
            <span>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">

        {/* Status */}
        {canUpdate ? (
          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(task._id, e.target.value)
            }
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <span className="text-gray-300 capitalize text-sm">
            {task.status}
          </span>
        )}

        {/* Delete */}
        {canDelete && (
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;

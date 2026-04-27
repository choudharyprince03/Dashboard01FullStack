import { motion } from "framer-motion";
import { Trash2, Clock, AlertCircle } from "lucide-react";

const priorityColors = {
  low: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20",
  medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-400/10 border-yellow-200 dark:border-yellow-400/20",
  high: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border-red-200 dark:border-red-400/20",
};

const TaskItem = ({
  task,
  canUpdate,
  canDelete,
  onStatusChange,
  onDelete
}) => {
  const pColor = priorityColors[task.priority] || priorityColors.medium;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="group bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 p-5 rounded-xl border border-gray-100 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm dark:shadow-none"
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-gray-900 dark:text-white font-semibold text-lg truncate group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
          {task.title}
        </h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2 pr-4 transition-colors">
          {task.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
          {task.priority && (
            <span className={`px-2.5 py-1 rounded-full border ${pColor} flex items-center gap-1.5 capitalize font-medium transition-colors`}>
              <AlertCircle className="w-3.5 h-3.5" />
              {task.priority}
            </span>
          )}

          {task.dueDate && (
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-black/20 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/5 transition-colors">
              <Clock className="w-3.5 h-3.5" />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Status */}
        {canUpdate ? (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm px-3 py-2 rounded-lg hover:border-blue-500/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors cursor-pointer appearance-none"
            style={{ WebkitAppearance: 'none' }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <span className="text-gray-600 dark:text-gray-300 capitalize text-sm bg-gray-100 dark:bg-black/20 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/5 transition-colors">
            {task.status.replace('-', ' ')}
          </span>
        )}

        {/* Delete */}
        {canDelete && (
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default TaskItem;

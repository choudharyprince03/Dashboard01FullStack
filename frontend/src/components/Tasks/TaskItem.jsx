import { motion as Motion } from "framer-motion";
import { Trash2, Clock, AlertCircle } from "lucide-react";

const priorityColors = {
  low: "text-[#48684F] bg-[#DFE8DC] border-[#C6D7C2]",
  medium: "text-[#8A6631] bg-[#F1E3C5] border-[#E2C995]",
  high: "text-[#8F4F49] bg-[#F4E6E4] border-[#E1C1BC]",
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
    <Motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="group bg-[#F7F6F2] hover:bg-[#EDEAE2] p-5 rounded-xl border border-[#D8D3C7] hover:border-[#C6D7C2] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <h4 className="text-[#2C3040] font-semibold text-lg truncate group-hover:text-[#48684F] transition-colors">
          {task.title}
        </h4>
        <p className="text-[#7B8190] text-sm mt-1 line-clamp-2 pr-4 transition-colors">
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
            <span className="flex items-center gap-1.5 text-[#5E6473] bg-[#EDEAE2] px-2.5 py-1 rounded-full border border-[#D8D3C7] transition-colors">
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
            className="bg-[#F7F6F2] border border-[#D8D3C7] text-[#2C3040] text-sm px-3 py-2 rounded-lg hover:border-[#6B8F71]/50 focus:border-[#6B8F71] focus:ring-1 focus:ring-[#6B8F71] outline-none transition-colors cursor-pointer appearance-none"
            style={{ WebkitAppearance: 'none' }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <span className="text-[#5E6473] capitalize text-sm bg-[#EDEAE2] px-3 py-1.5 rounded-lg border border-[#D8D3C7] transition-colors">
            {task.status.replace('-', ' ')}
          </span>
        )}

        {/* Delete */}
        {canDelete && (
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-[#8A8F9E] hover:text-[#A7625B] hover:bg-[#F4E6E4] rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </Motion.div>
  );
};

export default TaskItem;

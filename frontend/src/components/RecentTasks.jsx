import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, Circle, ListPlus } from "lucide-react";

const statusConfig = {
  "todo": {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/20",
    icon: <Circle className="w-4 h-4 text-gray-400" />
  },
  "in-progress": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    icon: <Clock className="w-4 h-4 text-blue-400" />
  },
  "blocked": {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    icon: <AlertCircle className="w-4 h-4 text-red-400" />
  },
  "done": {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/20",
    icon: <CheckCircle2 className="w-4 h-4 text-green-400" />
  }
};

const RecentTasks = ({ tasks }) => {
  if (!tasks.length) {
    return (
      <div className="bg-white/80 dark:bg-[#121A2F]/60 backdrop-blur-md p-10 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center text-center transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 transition-colors">
          <ListPlus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors">No recent tasks</h3>
        <p className="text-gray-500 dark:text-gray-500 text-sm max-w-sm transition-colors">
          You are all caught up! When new tasks are added or updated, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-[#121A2F]/60 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-md dark:shadow-xl transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 transition-colors">
          Recent Tasks
        </h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const config = statusConfig[task.status] || statusConfig["todo"];
          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              key={task._id}
              className="group flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {config.icon}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
                    {task.title}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-1 transition-colors">
                    {task.description}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap self-start sm:self-auto border ${config.bg} ${config.text} ${config.border}`}
              >
                {task.status.replace('-', ' ').toUpperCase()}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};


export default RecentTasks;

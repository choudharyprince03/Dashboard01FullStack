import { motion as Motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, Circle, ListPlus } from "lucide-react";

const statusConfig = {
  "todo": {
    bg: "bg-[#EDEAE2]",
    text: "text-[#5E6473]",
    border: "border-[#D8D3C7]",
    icon: <Circle className="w-4 h-4 text-[#8A8F9E]" />
  },
  "in-progress": {
    bg: "bg-[#E6EDF3]",
    text: "text-[#5E7894]",
    border: "border-[#C8D8E8]",
    icon: <Clock className="w-4 h-4 text-[#6F8FAF]" />
  },
  "blocked": {
    bg: "bg-[#F4E6E4]",
    text: "text-[#8F4F49]",
    border: "border-[#E1C1BC]",
    icon: <AlertCircle className="w-4 h-4 text-[#A7625B]" />
  },
  "done": {
    bg: "bg-[#DFE8DC]",
    text: "text-[#48684F]",
    border: "border-[#C6D7C2]",
    icon: <CheckCircle2 className="w-4 h-4 text-[#6B8F71]" />
  }
};

const RecentTasks = ({ tasks }) => {
  if (!tasks.length) {
    return (
      <div className="bg-[#F7F6F2]/95 backdrop-blur-md p-10 rounded-2xl border border-[#D8D3C7] flex flex-col items-center justify-center text-center transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-[#EDEAE2] flex items-center justify-center mb-4 transition-colors">
          <ListPlus className="w-8 h-8 text-[#8A8F9E]" />
        </div>
        <h3 className="text-xl font-semibold text-[#2C3040] mb-2 transition-colors">No recent tasks</h3>
        <p className="text-[#7B8190] text-sm max-w-sm transition-colors">
          You are all caught up! When new tasks are added or updated, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F6F2]/95 backdrop-blur-md p-6 rounded-2xl border border-[#D8D3C7] shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#2C3040] transition-colors">
          Recent Tasks
        </h3>
        <button className="text-sm text-[#48684F] hover:text-[#3F5D45] transition-colors font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const config = statusConfig[task.status] || statusConfig["todo"];
          return (
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              key={task._id}
              className="group flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl bg-[#F7F6F2] border border-[#D8D3C7] hover:border-[#C6D7C2] hover:bg-[#EDEAE2] transition-all duration-300 gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {config.icon}
                </div>
                <div>
                  <p className="text-[#2C3040] font-medium group-hover:text-[#48684F] transition-colors">
                    {task.title}
                  </p>
                  <p className="text-[#7B8190] text-sm mt-1 line-clamp-1 transition-colors">
                    {task.description}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap self-start sm:self-auto border ${config.bg} ${config.text} ${config.border}`}
              >
                {task.status.replace('-', ' ').toUpperCase()}
              </span>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
};


export default RecentTasks;

import React from "react";

const TaskStats = ({ tasks }) => {
  // Calculate task status distribution
  const statusDistribution = {
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    blocked: tasks.filter((t) => t.status === "blocked").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  // Calculate task priority distribution
  const priorityDistribution = {
    low: tasks.filter((t) => t.priority === "low").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  // Calculate average completion time
  const completedTasks = tasks.filter((t) => t.status === "done");
  const avgCompletionTime =
    completedTasks.length > 0
      ? completedTasks.reduce((sum, task) => {
          const created = new Date(task.createdAt);
          const updated = new Date(task.updatedAt);
          return sum + (updated - created) / (1000 * 60 * 60 * 24); // days
        }, 0) / completedTasks.length
      : 0;

  const total = tasks.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Status Distribution */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Task Status Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Todo</span>
              <span className="text-sm font-semibold">{statusDistribution.todo}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(statusDistribution.todo / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">In Progress</span>
              <span className="text-sm font-semibold">{statusDistribution.inProgress}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(statusDistribution.inProgress / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Blocked</span>
              <span className="text-sm font-semibold">{statusDistribution.blocked}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(statusDistribution.blocked / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Done</span>
              <span className="text-sm font-semibold">{statusDistribution.done}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(statusDistribution.done / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Priority Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Low</span>
              <span className="text-sm font-semibold">{priorityDistribution.low}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(priorityDistribution.low / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">Medium</span>
              <span className="text-sm font-semibold">{priorityDistribution.medium}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(priorityDistribution.medium / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-400">High</span>
              <span className="text-sm font-semibold">{priorityDistribution.high}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full"
                style={{
                  width: total > 0 ? `${(priorityDistribution.high / total) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Completion Metrics */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Task Metrics</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Completion Rate</p>
            <p className="text-3xl font-bold text-green-400">
              {total > 0 ? Math.round((statusDistribution.done / total) * 100) : 0}%
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Avg. Completion Time</p>
            <p className="text-lg font-semibold">
              {avgCompletionTime.toFixed(1)} <span className="text-xs">days</span>
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Completed Tasks</p>
            <p className="text-2xl font-bold text-blue-400">
              {statusDistribution.done} / {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;

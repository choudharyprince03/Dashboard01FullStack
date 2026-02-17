const statusColors = {
  "todo": "bg-gray-600",
  "in-progress": "bg-blue-600",
  "blocked": "bg-red-600",
  "done": "bg-green-600"
};

const RecentTasks = ({ tasks }) => {
  if (!tasks.length) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-sm">
          No recent tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-white font-semibold mb-4">
        Recent Tasks
      </h3>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex justify-between items-center"
          >
            <div>
              <p className="text-white font-medium">
                {task.title}
              </p>
              <p className="text-gray-400 text-sm">
                {task.description}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full text-white ${statusColors[task.status]}`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;

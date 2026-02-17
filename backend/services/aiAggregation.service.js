import Task from "../model/task.model.js";

const aggregateUserData = async (userId) => {
  const tasks = await Task.find({ assignee: userId });

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.status === "done"
  ).length;

  const blockedTasks = tasks.filter(
    task => task.status === "blocked"
  ).length;

  const overdueTasks = tasks.filter(task =>
    task.dueDate &&
    task.status !== "done" &&
    task.dueDate < new Date()
  ).length;

  // Average completion time
  const completed = tasks.filter(
    task => task.status === "done"
  );

  let avgCompletionTime = null;

  if (completed.length > 0) {
    const totalTime = completed.reduce((sum, task) => {
      const diff =
        (task.updatedAt - task.createdAt) /
        (1000 * 60 * 60 * 24); // days
      return sum + diff;
    }, 0);

    avgCompletionTime = Number(
      (totalTime / completed.length).toFixed(2)
    );
  }

  return {
    totalTasks,
    completedTasks,
    blockedTasks,
    overdueTasks,
    avgCompletionTime
  };
};



const aggregateManagerData = async () => {
    const tasks = await Task.find().populate("assignee", "name");

    const totalTasks = tasks.length;

    const blockedTasks = tasks.filter(
        task => task.status === "blocked"
    ).length;

    const tasksPerUser = {};
    const blockedPerUser = {};

    tasks.forEach(task => {
        const userName = task.assignee?.name || "Unknown";

        tasksPerUser[userName] =
        (tasksPerUser[userName] || 0) + 1;

        if (task.status === "blocked") {
        blockedPerUser[userName] =
            (blockedPerUser[userName] || 0) + 1;
        }
    });

    const usersWithMostBlockedTasks = Object.entries(blockedPerUser)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([user, count]) => ({ user, count }));

    return {
        totalTasks,
        blockedTasks,
        tasksPerUser,
        usersWithMostBlockedTasks
    };
};

const aggregateSystemData = async () => {
  // For now, system scope == manager scope
  return aggregateManagerData();
};


export  {
  aggregateUserData,
  aggregateManagerData,
  aggregateSystemData
};

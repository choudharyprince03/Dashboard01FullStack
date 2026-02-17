
const buildUserPrompt = (summary) => {
  return `
You are a productivity assistant.

Here is the user's task summary:
- Total tasks: ${summary.totalTasks}
- Completed tasks: ${summary.completedTasks}
- Blocked tasks: ${summary.blockedTasks}
- Overdue tasks: ${summary.overdueTasks}
- Average completion time: ${summary.avgCompletionTime ?? "N/A"} days

Analyze this data and respond with:
1. A brief performance summary
2. One clear issue (if any)
3. One actionable improvement suggestion

Rules:
- Be concise
- Do not speculate
- Do not assign blame
- Do not suggest system changes
` 
};

const buildManagerPrompt = (summary) => {
  return `
You are an operations analyst.

Here is the task overview across all users:
- Total tasks: ${summary.totalTasks}
- Blocked tasks: ${summary.blockedTasks}

Tasks per user:
${Object.entries(summary.tasksPerUser)
  .map(([user, count]) => `- ${user}: ${count} tasks`)
  .join("\n")}

Users with the most blocked tasks:
${summary.usersWithMostBlockedTasks
  .map(item => `- ${item.user}: ${item.count} blocked`)
  .join("\n")}

Analyze this data and respond with:
1. Key bottlenecks
2. Risk areas
3. One actionable recommendation

Rules:
- Be factual
- Do not guess intent
- Do not suggest disciplinary actions
`;
};

const buildSystemPrompt = (summary) => {
  return `
You are a system operations analyst.

Here is the system-wide task summary:
- Total tasks: ${summary.totalTasks}
- Blocked tasks: ${summary.blockedTasks}

Analyze system-level patterns and respond with:
1. Overall system health
2. Major risks
3. One improvement suggestion

Rules:
- High-level analysis only
- No operational instructions
`;
};


export {

    buildUserPrompt,
    buildManagerPrompt,
    buildSystemPrompt

}; 

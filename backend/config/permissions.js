const rolePermissions = {
  user: [
    "view_dashboard",
    "view_tasks",
    "update_task_status",
    "view_ai_insights"
  ],

  manager: [
    "view_dashboard",
    "view_tasks",
    "update_task_status",
    "create_task",
    "delete_task",
    "assign_task",
    "view_ai_insights"
  ],

  admin: [
    "view_dashboard",
    "view_tasks",
    "update_task_status",
    "create_task",
    "delete_task",
    "assign_task",
    "view_ai_insights",
    "view_users",
    "promote_users"
  ]
};
export default rolePermissions; 
/** Map backend statuses (ToDo, InProgress, DONE, ...) to UI buckets used by cards & stats */
export function normalizeTaskUiStatus(backendStatus) {
  const s = String(backendStatus ?? "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, "");
  if (s === "done" || s === "completed" || s === "closed") return "completed";
  if (s.includes("progress") || s === "inprogress") return "in-progress";
  return "pending";
}

export function taskToCard(apiTask, { memberLabel } = {}) {
  const ui = normalizeTaskUiStatus(apiTask.status);
  const assignee =
    memberLabel ??
    (apiTask.assignedUserId != null
      ? `User ${apiTask.assignedUserId}`
      : "Unassigned");
  const initial = assignee.trim().slice(0, 1).toUpperCase() || "U";

  return {
    id: apiTask.id,
    title: apiTask.title,
    desc: apiTask.description ?? "",
    status: ui,
    due_date: apiTask.dueDate
      ? new Date(apiTask.dueDate).toLocaleDateString()
      : "No due date",
    member: {
      name: assignee,
      avatar: initial,
      role: "Member",
    },
    raw: apiTask,
  };
}

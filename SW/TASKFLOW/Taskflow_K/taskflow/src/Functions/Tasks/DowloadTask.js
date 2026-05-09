import { message } from "antd";
import { GetStatusText } from "./GetStatusText";

const handleDownloadTask = (task) => {
  const taskDetails = `
Task Report
================================
Title: ${task.title}
Description: ${task.description}
Status: ${GetStatusText(task.status)}
Approved: ${task.approved ? "Yes" : "No"}
Created: ${task.createdAt}
Due Date: ${task.dueDate}
${task.completedAt ? `Completed: ${task.completedAt}` : ""}
priority: ${task.priority}
    `.trim();

  const blob = new Blob([taskDetails], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `task_${task.id}_${task.title.replace(/\s+/g, "_")}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  message.success("Task downloaded successfully");
};

export default handleDownloadTask;

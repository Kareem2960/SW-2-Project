export const GetStatusText = (status) => {
    const texts = {
      TODO: "To Do",
      todo: "To Do",
      ToDo: "To Do",
      IN_PROGRESS: "In Progress",
      InProgress: "In Progress",
      IN_REVIEW: "In Review",
      DONE: "Done",
      Done: "Done",
      BLOCKED: "Blocked",
      pending: "To Do",
      "in-progress": "In Progress",
      completed: "Done",
      rejected: "Rejected",
    };
    return texts[status] || texts[String(status ?? "").trim()] || status;
  };
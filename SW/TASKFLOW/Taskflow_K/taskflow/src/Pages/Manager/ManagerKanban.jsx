import { useState, useEffect } from "react";
import TaskColumn from "../../Components/Member/Dashboard/TaskBoard/TaskColumn";
import { api } from "../../config/http";

const ManagerKanban = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes] = await Promise.all([
        api.get("/api/projects"),
        api.get("/api/tasks")
      ]);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const todoTasks = tasks.filter(t => t.status === "ToDo");
  const inProgressTasks = tasks.filter(t => t.status === "InProgress");
  const doneTasks = tasks.filter(t => t.status === "Done");

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || `Project ${projectId}`;
  };

  return (
    <div style={{ padding: "24px" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          <TaskColumn
            title="To Do"
            count={todoTasks.length}
            items={todoTasks.map(t => ({
              id: t.id,
              title: t.title,
              project: getProjectName(t.projectId),
              dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due date",
              priority: t.priority?.toLowerCase() || "medium",
              statusLabel: "To Do"
            }))}
            tone="todo"
          />
          <TaskColumn
            title="In Progress"
            count={inProgressTasks.length}
            items={inProgressTasks.map(t => ({
              id: t.id,
              title: t.title,
              project: getProjectName(t.projectId),
              dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due date",
              priority: t.priority?.toLowerCase() || "medium",
              statusLabel: "In Progress"
            }))}
            tone="progress"
          />
          <TaskColumn
            title="Done"
            count={doneTasks.length}
            items={doneTasks.map(t => ({
              id: t.id,
              title: t.title,
              project: getProjectName(t.projectId),
              dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "No due date",
              priority: t.priority?.toLowerCase() || "medium",
              statusLabel: "Done"
            }))}
            tone="done"
          />
        </div>
      )}
    </div>
  );
};

export default ManagerKanban;

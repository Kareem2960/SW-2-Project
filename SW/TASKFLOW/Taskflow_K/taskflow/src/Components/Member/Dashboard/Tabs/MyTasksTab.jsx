import React, { useMemo, useRef, useState, useEffect } from "react";
import TaskColumn from "../TaskBoard/TaskColumn";
import TaskDetailsModal from "../TaskBoard/TaskDetailsModal";
import { useNotifications } from "../../../../Context/NotificationsProvider";
import { api } from "../../../../config/http";

const MyTasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toastTimerRef = useRef(null);
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/tasks/my-tasks");
      const formattedTasks = response.data.map((task) => ({
        id: task.id.toString(),
        title: task.title,
        project: `Project ${task.projectId}`,
        dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date",
        priority: task.priority?.toLowerCase() || "medium",
        statusLabel: task.status === "DONE" ? "Done" : task.status === "IN_PROGRESS" ? "In progress" : "Todo",
        description: task.description || "No description",
        assignedTo: "You",
        createdBy: "Manager",
        lastUpdated: "just now",
        attachments: [],
        comments: [],
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const taskColumns = useMemo(() => {
    const todoItems = tasks.filter((task) => task.statusLabel === "Todo");
    const progressItems = tasks.filter((task) => task.statusLabel === "In progress");
    const doneItems = tasks.filter((task) => task.statusLabel === "Done");

    return [
      { id: "todo", title: "To Do", tone: "todo", items: todoItems },
      { id: "progress", title: "In Progress", tone: "progress", items: progressItems },
      { id: "done", title: "Completed", tone: "done", items: doneItems },
    ];
  }, [tasks]);

  const pushNotification = ({ type, title, message }) => {
    addNotification({ type, title, message });
    setToastMessage(message);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      const previousTask = tasks.find((task) => task.id === updatedTask.id);
      
      // Map statusLabel to API status
      const statusMap = {
        "Todo": "ToDo",
        "In progress": "InProgress",
        "Done": "Done"
      };
      
      await api.put(`/api/tasks/${updatedTask.id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        priority: updatedTask.priority,
        status: statusMap[updatedTask.statusLabel] || "ToDo",
        dueDate: updatedTask.dueDate === "No due date" ? null : new Date(updatedTask.dueDate).toISOString(),
        projectId: updatedTask.projectId || 0,
        assignedUserId: null,
      });

      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
      setSelectedTask(updatedTask);

      if (previousTask && previousTask.assignedTo !== updatedTask.assignedTo) {
        pushNotification({
          type: "assigned",
          title: "Task assigned to you",
          message: `Task "${updatedTask.title}" assigned to ${updatedTask.assignedTo}.`,
        });
      } else {
        pushNotification({
          type: "updated",
          title: "Task updated",
          message: `Task "${updatedTask.title}" updated successfully.`,
        });
      }
    } catch (error) {
      console.error("Error saving task:", error);
      pushNotification({
        type: "error",
        title: "Error",
        message: "Failed to save task changes.",
      });
    }
  };

  return (
    <>
      {toastMessage && (
        <div className="fixed right-5 top-5 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 shadow">
          {toastMessage}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {taskColumns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              count={column.items.length}
              items={column.items}
              tone={column.tone}
              onTaskClick={setSelectedTask}
            />
          ))}
        </div>
      )}

      <TaskDetailsModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSave={handleSaveTask}
      />
    </>
  );
};

export default MyTasksTab;

import React, { useMemo, useState, useEffect, useCallback } from "react";
import AnalyticsTab from "./Tabs/AnalyticsTab";
import DashboardTabs from "./DashboardTabs";
import OverdueAlert from "./OverdueAlert";
import StatCard from "./StatCard";
import MyProjectsTab from "./Tabs/MyProjectsTab";
import MyTasksTab from "./Tabs/MyTasksTab";
import { useTheme } from "../../../Context/DarkModeProvider";
import { useNotifications } from "../../../Context/NotificationsProvider";
import { api } from "../../../config/http";
import { connectWebSocket, disconnectWebSocket } from "../../../services/websocketService";
import { normalizeTaskUiStatus } from "../../../utils/taskStatus";

const tabs = [
  { id: "tasks", label: "My Tasks" },
  { id: "projects", label: "My Projects" },
  { id: "analytics", label: "Analytics" },
];

const MemberDashboardContent = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("memberDashboardActiveTab");
    return saved || "tasks";
  });
  const { isDarkMode } = useTheme();
  const { addNotification } = useNotifications();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem("memberDashboardActiveTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const checkAuthAndFetchTasks = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      setIsAuthenticated(true);
      
      try {
        const response = await api.get("/api/tasks/my-tasks");
        setTasks(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        console.error("Error details:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
        setLoading(false);
        // Set empty array on error to prevent undefined
        setTasks([]);
      }
    };

    checkAuthAndFetchTasks();
  }, []);

  const fetchNotifications = useCallback(async () => {
    // Disabled to avoid 405 error - NotificationsProvider handles this
    // try {
    //   const response = await api.get("/api/notifications/my");
    //   const notifications = response.data.map((n) => ({
    //     id: n.id.toString(),
    //     type: "updated",
    //     title: n.message || "Notification",
    //     message: n.message || "Task updated",
    //     createdAt: Date.now(),
    //   }));
    //   notifications.forEach((n) => addNotification(n));
    // } catch (error) {
    //   console.error("Error fetching notifications:", error);
    // }
  }, [addNotification]);

  useEffect(() => {
    // fetchNotifications();

    const setupWebSocket = () => {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        if (token && userStr) {
          const user = JSON.parse(userStr);
          connectWebSocket(token, user.id || 39, (notification) => {
            addNotification({
              id: `${Date.now()}`,
              type: "updated",
              title: notification.title || "New Notification",
              message: notification.message || notification.description || "New notification received",
              createdAt: Date.now(),
            });
          });
        }
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    setupWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [addNotification]);

  const statsData = useMemo(() => {
    if (loading) {
      return [
        { title: "Total Tasks", value: "-", subtitle: "Loading...", iconName: "tasks", colorTheme: "primary" },
        { title: "Completed", value: "-", subtitle: "Loading...", iconName: "completed", colorTheme: "green" },
        { title: "In Progress", value: "-", subtitle: "Loading...", iconName: "inprogress", colorTheme: "orange" },
        { title: "To Do", value: "-", subtitle: "Loading...", iconName: "todo", colorTheme: "purple" },
        { title: "Overdue", value: "-", subtitle: "Loading...", iconName: "overdue", colorTheme: "red" },
      ];
    }

    if (tasks.length === 0) {
      return [
        { title: "Total Tasks", value: "0", subtitle: "No tasks assigned", iconName: "tasks", colorTheme: "primary" },
        { title: "Completed", value: "0", subtitle: "No completed tasks", iconName: "completed", colorTheme: "green" },
        { title: "In Progress", value: "0", subtitle: "No active tasks", iconName: "inprogress", colorTheme: "orange" },
        { title: "To Do", value: "0", subtitle: "No pending tasks", iconName: "todo", colorTheme: "purple" },
        { title: "Overdue", value: "0", subtitle: "No overdue tasks", iconName: "overdue", colorTheme: "red" },
      ];
    }

    const total = tasks.length;
    const uiStatus = (t) => normalizeTaskUiStatus(t.status);
    const completed = tasks.filter((t) => uiStatus(t) === "completed").length;
    const inProgress = tasks.filter((t) => uiStatus(t) === "in-progress").length;
    const toDo = tasks.filter((t) => uiStatus(t) === "pending").length;
    const overdue = tasks.filter((t) => {
      if (!t.dueDate || t.dueDate === "No due date") return false;
      return new Date(t.dueDate) < new Date() && uiStatus(t) !== "completed";
    }).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return [
      { title: "Total Tasks", value: total.toString(), subtitle: `${completionRate}% completion`, iconName: "tasks", colorTheme: "primary" },
      { title: "Completed", value: completed.toString(), subtitle: "Task finished", iconName: "completed", colorTheme: "green" },
      { title: "In Progress", value: inProgress.toString(), subtitle: "Active work", iconName: "inprogress", colorTheme: "orange" },
      { title: "To Do", value: toDo.toString(), subtitle: "Pending tasks", iconName: "todo", colorTheme: "purple" },
      { title: "Overdue", value: overdue.toString(), subtitle: "Needs attention", iconName: "overdue", colorTheme: "red" },
    ];
  }, [tasks, loading]);

  const overdueCount = useMemo(() => statsData.find((item) => item.title === "Overdue")?.value || 0, [statsData]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className={`text-3xl font-bold tracking-tight ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>My Dashboard</h2>
        <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
          Track your assigned tasks, project progress, and performance analytics.
        </p>
      </div>

      {!isAuthenticated && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Authentication Required</h3>
          <p className="text-red-600 text-sm mt-1">
            Please log in to view your tasks. If you're seeing this message after logging in, please refresh the page.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statsData.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <OverdueAlert overdueCount={overdueCount} />

      <DashboardTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "tasks" && <MyTasksTab />}
      {activeTab === "projects" && <MyProjectsTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
    </section>
  );
};

export default MemberDashboardContent;

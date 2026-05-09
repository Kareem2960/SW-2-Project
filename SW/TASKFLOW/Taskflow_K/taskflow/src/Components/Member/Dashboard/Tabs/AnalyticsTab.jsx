import React, { useState, useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../../../../config/http";

const AnalyticsTab = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusData = useMemo(() => {
    const todo = tasks.filter(t => t.status === "ToDo").length;
    const inProgress = tasks.filter(t => t.status === "InProgress").length;
    const done = tasks.filter(t => t.status === "Done").length;

    return [
      { name: "To Do", value: todo, color: "#6b7280" },
      { name: "In Progress", value: inProgress, color: "#3b82f6" },
      { name: "Done", value: done, color: "#10b981" },
    ];
  }, [tasks]);

  const priorityData = useMemo(() => {
    const high = tasks.filter(t => t.priority?.toLowerCase() === "high").length;
    const medium = tasks.filter(t => t.priority?.toLowerCase() === "medium").length;
    const low = tasks.filter(t => t.priority?.toLowerCase() === "low").length;

    return [
      { name: "High", value: high, color: "#ef4444" },
      { name: "Medium", value: medium, color: "#f59e0b" },
      { name: "Low", value: low, color: "#10b981" },
    ];
  }, [tasks]);

  const trendData = useMemo(() => {
    const completed = tasks.filter(t => t.status === "Done").length;
    const inProgress = tasks.filter(t => t.status === "InProgress").length;
    const todo = tasks.filter(t => t.status === "ToDo").length;

    return [
      { month: "Completed", value: completed, color: "#10b981" },
      { month: "In Progress", value: inProgress, color: "#3b82f6" },
      { month: "To Do", value: todo, color: "#6b7280" },
    ];
  }, [tasks]);

  const ChartCard = ({ title, subtitle, children }) => (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500">{subtitle}</p>
      <div className="mt-3 h-52 w-full" style={{ minHeight: '208px', minWidth: '100%' }}>
        <ResponsiveContainer width="100%" height="100%" aspect={undefined}>
          {children}
        </ResponsiveContainer>
      </div>
    </article>
  );

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="My Task Status Distribution" subtitle="Current status of your assigned tasks">
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={62} label>
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="My Task Priority Distribution" subtitle="Priority levels across your tasks">
          <PieChart>
            <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={62} label>
              {priorityData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800">Task Status Overview</h3>
        <p className="text-xs text-slate-500">Current distribution of task statuses</p>
        <div className="mt-3 h-64 w-full" style={{ minHeight: '256px', minWidth: '100%' }}>
          <ResponsiveContainer width="100%" height="100%" aspect={undefined}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
};

export default AnalyticsTab;

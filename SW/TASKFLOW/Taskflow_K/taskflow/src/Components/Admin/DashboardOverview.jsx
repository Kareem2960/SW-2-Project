// ==================== Ant Design ====================
import { Card, Col, Row, Typography, Tag } from "antd";
// ==================== Recharts ====================
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTheme } from "../../Context/DarkModeProvider";
import { api } from "../../config/http";
import { useState, useEffect } from "react";
import { normalizeTaskUiStatus } from "../../utils/taskStatus";

const { Title, Text } = Typography;

const DashboardOverview = () => {
  const { isDarkMode } = useTheme();
  const [projectStatusData, setProjectStatusData] = useState([]);
  const [monthlyActivityData, setMonthlyActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, tasksRes] = await Promise.all([
        api.get("/api/projects"),
        api.get("/api/tasks")
      ]);

      const projects = projectsRes.data || [];
      const tasks = tasksRes.data || [];

      const tasksByProjectId = tasks.reduce((acc, t) => {
        const pid = t.projectId;
        if (pid == null) return acc;
        if (!acc[pid]) acc[pid] = [];
        acc[pid].push(t);
        return acc;
      }, {});

      const completedProjects = projects.filter((p) => {
        const pt = tasksByProjectId[p.id] || [];
        if (pt.length === 0) return false;
        return pt.every((t) => normalizeTaskUiStatus(t.status) === "completed");
      }).length;

      const inProgressProjects = projects.filter((p) => {
        const pt = tasksByProjectId[p.id] || [];
        if (pt.length === 0) return false;
        const allDone = pt.every((t) => normalizeTaskUiStatus(t.status) === "completed");
        return pt.some((t) => normalizeTaskUiStatus(t.status) === "in-progress") && !allDone;
      }).length;

      const pendingProjects = projects.filter((p) => {
        const pt = tasksByProjectId[p.id] || [];
        if (pt.length === 0) return true;
        return pt.every((t) => normalizeTaskUiStatus(t.status) === "pending");
      }).length;

      const delayedProjects = projects.filter((p) => {
        const pt = tasksByProjectId[p.id] || [];
        return pt.some((t) => {
          if (!t.dueDate) return false;
          return (
            new Date(t.dueDate) < new Date() &&
            normalizeTaskUiStatus(t.status) !== "completed"
          );
        });
      }).length;

      const totalProjects = projects.length;

      const total = completedProjects + inProgressProjects + pendingProjects + delayedProjects;

      setProjectStatusData([
        { name: "Completed", value: total > 0 ? Math.round((completedProjects / total) * 100) : 0, color: "#22c55e" },
        { name: "In Progress", value: total > 0 ? Math.round((inProgressProjects / total) * 100) : 0, color: "#3b82f6" },
        { name: "Pending", value: total > 0 ? Math.round((pendingProjects / total) * 100) : 0, color: "#f97316" },
        { name: "Delayed", value: total > 0 ? Math.round((delayedProjects / total) * 100) : 0, color: "#ef4444" },
      ]);

      // Monthly activity (simplified - current month only)
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });
      setMonthlyActivityData([
        { month: currentMonth, projects: totalProjects, tasks: tasks.length },
      ]);
    } catch (error) {
      console.error("Error fetching overview data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Project Status
              </Title>
            }
            style={{ height: "100%", borderRadius: "24px", overflow: "hidden" }}
            styles={{ body: { padding: "24px" } }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  minHeight: "280px",
                }}
              >
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "12px",
                }}
              >
                {projectStatusData.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      borderRadius: "18px",
                      background: isDarkMode ? "#1e293b" : "#f8fafc",
                      border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
                    }}
                  >
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "999px",
                        background: item.color,
                      }}
                    />
                    <div>
                      <Text strong>{item.name}</Text>
                      <div style={{ color: "#6b7280", fontSize: "13px" }}>
                        {item.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                Monthly Activity
              </Title>
            }
            style={{ height: "100%", borderRadius: "24px", overflow: "hidden" }}
            styles={{ body: { padding: "24px" } }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <Text strong style={{ fontSize: "14px" }}>
                    This quarter
                  </Text>
                  <div style={{ color: "#6b7280", fontSize: "12px" }}>
                    Project and task growth
                  </div>
                </div>
                <Tag color="geekblue">Stable</Tag>
              </div>
              <div style={{ minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyActivityData}
                    margin={{ top: 0, right: 0, left: -14, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={isDarkMode ? "#334155" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: isDarkMode ? "#94a3b8" : "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: isDarkMode ? "#94a3b8" : "#6b7280" }}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="projects"
                      fill="#3b82f6"
                      radius={[12, 12, 0, 0]}
                      barSize={24}
                    />
                    <Bar
                      dataKey="tasks"
                      fill="#8b5cf6"
                      radius={[12, 12, 0, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;

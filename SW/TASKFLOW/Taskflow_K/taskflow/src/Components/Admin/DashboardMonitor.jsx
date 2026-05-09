// ==================== Ant Design ====================
import { Col, Row, Typography } from "antd";
// ==================== Icons ====================
import {
  Users,
  UserCog,
  UsersRound,
  FolderKanban,
  CheckSquare,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "../../Context/DarkModeProvider";
import { api } from "../../config/http";
import { useState, useEffect } from "react";
import { primaryRole } from "../../utils/userRole";
import { normalizeTaskUiStatus } from "../../utils/taskStatus";

const { Title } = Typography;

const DashboardMonitor = () => {
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, projectsRes, tasksRes] = await Promise.all([
        api.get("/api/admin/users"),
        api.get("/api/projects"),
        api.get("/api/tasks")
      ]);

      const users = usersRes.data || [];
      const projects = projectsRes.data || [];
      const tasks = tasksRes.data || [];

      const admins = users.filter((u) => primaryRole(u.roles) === "Admin").length;
      const managers = users.filter((u) => primaryRole(u.roles) === "Manager").length;
      const members = users.filter((u) => primaryRole(u.roles) === "Member").length;
      const totalUsers = admins + managers + members;

      const completedTasks = tasks.filter((t) => normalizeTaskUiStatus(t.status) === "completed").length;
      const totalTasks = tasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      setStats([
        {
          title: "Total Users",
          value: totalUsers.toString(),
          ratio: 100,
          description: "Active users in system",
          icon: <Users size={28} />,
          color: "#3b82f6",
          accent: "#eff6ff",
        },
        {
          title: "Project Managers",
          value: managers.toString(),
          ratio: totalUsers > 0 ? Math.round((managers / totalUsers) * 100) : 0,
          description: "Managing projects",
          icon: <UserCog size={28} />,
          color: "#8b5cf6",
          accent: "#f5f3ff",
        },
        {
          title: "Team Members",
          value: members.toString(),
          ratio: totalUsers > 0 ? Math.round((members / totalUsers) * 100) : 0,
          description: "Working on tasks",
          icon: <UsersRound size={28} />,
          color: "#22c55e",
          accent: "#ecfdf5",
        },
        {
          title: "Total Projects",
          value: projects.length.toString(),
          ratio: 100,
          description: "Active projects",
          icon: <FolderKanban size={28} />,
          color: "#14b8a6",
          accent: "#ccfbf1",
        },
        {
          title: "Total Tasks",
          value: totalTasks.toString(),
          ratio: 100,
          description: "Tasks assigned",
          icon: <CheckSquare size={28} />,
          color: "#f97316",
          accent: "#fff7ed",
        },
        {
          title: "Overall Progress",
          value: `${progress}%`,
          ratio: progress,
          description: "Completion rate",
          icon: <TrendingUp size={28} />,
          color: "#ec4899",
          accent: "#fff1f2",
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard monitor data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: "24px" }}>
        Dashboard Overview
      </Title>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <Row gutter={[24, 24]} justify="center">
          {stats.map((stat, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8}>
              <div
                style={{
                  background: isDarkMode ? "#1e293b" : "white",
                  borderRadius: "24px",
                  padding: "30px",
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 18px 38px rgba(15, 23, 42, 0.08)",
                  border: `1px solid ${isDarkMode ? "#334155" : stat.accent}`,
                }}
              >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background: isDarkMode ? "#334155" : stat.accent,
                  display: "grid",
                  placeItems: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>

              <div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: isDarkMode ? "#e2e8f0" : "#111827",
                    margin: "18px 0 8px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: isDarkMode ? "#e2e8f0" : "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  {stat.title}
                </div>
                <div style={{ color: isDarkMode ? "#94a3b8" : "#475569", fontSize: "14px" }}>
                  {stat.description}
                </div>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  height: "8px",
                  borderRadius: "999px",
                  background: isDarkMode ? "#334155" : "#e5e7eb",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${stat.ratio}%`,
                    height: "100%",
                    background: stat.color,
                  }}
                />
              </div>
              </div>
            </Col>
          ))}
        </Row>
        )}
      </div>
    );
  };

export default DashboardMonitor;

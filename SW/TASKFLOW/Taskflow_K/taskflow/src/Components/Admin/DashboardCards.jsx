// ==================== Ant Design ====================
import { Card, Col, Row, Progress, Typography, Tag } from "antd";
// ==================== Icons ====================
import {
  ShieldCheck,
  UserCog,
  Users,
  Clock,
  FolderOpen,
  ClipboardList,
  CheckCircle,
  PauseCircle,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../../Context/DarkModeProvider";
import { api } from "../../config/http";
import { useState, useEffect } from "react";
import { primaryRole } from "../../utils/userRole";
import { normalizeTaskUiStatus } from "../../utils/taskStatus";

const { Title, Text } = Typography;

const DashboardCards = () => {
  const { isDarkMode } = useTheme();
  const [usersData, setUsersData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
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

      // Calculate users data (auth returns roles[])
      const admins = users.filter((u) => primaryRole(u.roles) === "Admin").length;
      const managers = users.filter((u) => primaryRole(u.roles) === "Manager").length;
      const members = users.filter((u) => primaryRole(u.roles) === "Member").length;
      const totalUsers = admins + managers + members;

      setUsersData([
        {
          label: "Admins",
          value: admins,
          color: "#3b82f6",
          icon: <ShieldCheck size={20} />,
          ratio: totalUsers > 0 ? Math.round((admins / totalUsers) * 100) : 0,
        },
        {
          label: "Project Managers",
          value: managers,
          color: "#8b5cf6",
          icon: <UserCog size={20} />,
          ratio: totalUsers > 0 ? Math.round((managers / totalUsers) * 100) : 0,
        },
        {
          label: "Team Members",
          value: members,
          color: "#22c55e",
          icon: <Users size={20} />,
          ratio: totalUsers > 0 ? Math.round((members / totalUsers) * 100) : 0,
        },
      ]);

      // Calculate projects data
      const totalProjects = projects.length;
      setProjectsData([
        {
          label: "Active",
          value: totalProjects,
          color: "#22c55e",
          icon: <FolderOpen size={20} />,
          ratio: totalProjects > 0 ? 100 : 0,
        },
        {
          label: "Planning",
          value: 0,
          color: "#3b82f6",
          icon: <ClipboardList size={20} />,
          ratio: 0,
        },
        {
          label: "Completed",
          value: 0,
          color: "#8b5cf6",
          icon: <CheckCircle size={20} />,
          ratio: 0,
        },
        {
          label: "On Hold",
          value: 0,
          color: "#f97316",
          icon: <PauseCircle size={20} />,
          ratio: 0,
        },
      ]);

      // Calculate tasks data (task-service enums / strings)
      const todo = tasks.filter((t) => normalizeTaskUiStatus(t.status) === "pending").length;
      const inProgress = tasks.filter((t) => normalizeTaskUiStatus(t.status) === "in-progress").length;
      const completed = tasks.filter((t) => normalizeTaskUiStatus(t.status) === "completed").length;
      const totalTasks = todo + inProgress + completed;

      setTasksData([
        {
          label: "To Do",
          value: todo,
          color: "#6b7280",
          icon: <AlertCircle size={20} />,
          ratio: totalTasks > 0 ? Math.round((todo / totalTasks) * 100) : 0,
        },
        {
          label: "In Progress",
          value: inProgress,
          color: "#3b82f6",
          icon: <Clock size={20} />,
          ratio: totalTasks > 0 ? Math.round((inProgress / totalTasks) * 100) : 0,
        },
        {
          label: "Completed",
          value: completed,
          color: "#22c55e",
          icon: <CheckCircle size={20} />,
          ratio: totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0,
        },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "32px" }}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card
              title={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Users size={24} color="#2563eb" />
                  <Title level={4} style={{ margin: 0 }}>
                    Users Breakdown
                  </Title>
                </div>
              }
              style={{ height: "100%", borderRadius: "24px" }}
              styles={{ body: { padding: "24px" } }}
            >
            <div style={{ display: "grid", gap: "18px" }}>
              {usersData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "18px",
                    borderRadius: "20px",
                    border: `1px solid ${item.color}22`,
                    background: isDarkMode ? "#1e293b" : "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "12px",
                          display: "grid",
                          placeItems: "center",
                          background: item.color + "22",
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <Text strong>{item.label}</Text>
                        <div style={{ color: "#6b7280", fontSize: "13px" }}>
                          Team segment
                        </div>
                      </div>
                    </div>
                    <Tag
                      color={item.color}
                      style={{ borderRadius: "999px", fontWeight: 700 }}
                    >
                      {item.value}
                    </Tag>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {Array.from({ length: 5 }).map((_, step) => (
                      <div
                        key={step}
                        style={{
                          flex: 1,
                          height: "10px",
                          borderRadius: "999px",
                          background:
                            step < Math.round(item.ratio / 20)
                              ? item.color
                              : isDarkMode ? "#334155" : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "24px",
                padding: "18px",
                borderRadius: "20px",
                background: isDarkMode ? "#1e293b" : "#fffbeb",
                border: `1px solid ${isDarkMode ? "#334155" : "#fde68a"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text strong style={{ color: "#b45309" }}>
                  Pending Approvals
                </Text>
                <Tag color="orange" style={{ borderRadius: "999px" }}>
                  1
                </Tag>
              </div>
              <Text style={{ color: "#854d0e", fontSize: "13px" }}>
                Review manager requests and new team invites.
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FolderOpen size={24} color="#8b5cf6" />
                <Title level={4} style={{ margin: 0 }}>
                  Projects Status
                </Title>
              </div>
            }
            style={{ height: "100%", borderRadius: "24px" }}
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ display: "grid", gap: "18px" }}>
              {projectsData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>
                      {item.value}
                    </Text>
                  </div>
                  <Progress
                    percent={item.ratio}
                    showInfo={false}
                    strokeColor={item.color}
                    railColor={isDarkMode ? "#334155" : "#e5e7eb"}
                    steps={4}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <ClipboardList size={24} color="#16a34a" />
                <Title level={4} style={{ margin: 0 }}>
                  Tasks Status
                </Title>
              </div>
            }
            style={{ height: "100%", borderRadius: "24px" }}
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ display: "grid", gap: "18px" }}>
              {tasksData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div style={{ color: item.color }}>{item.icon}</div>
                      <Text strong>{item.label}</Text>
                    </div>
                    <Text strong style={{ color: item.color }}>
                      {item.value}
                    </Text>
                  </div>
                  <Progress
                    percent={item.ratio}
                    showInfo={false}
                    strokeColor={item.color}
                    railColor={isDarkMode ? "#334155" : "#e5e7eb"}
                    steps={5}
                    size="small"
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "24px",
                padding: "18px",
                borderRadius: "20px",
                background: isDarkMode ? "#1e293b" : "#dcfce7",
                border: `1px solid ${isDarkMode ? "#334155" : "#86efac"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Text strong style={{ color: isDarkMode ? "#e2e8f0" : "#166534" }}>
                  Overall Progress
                </Text>
                <Tag color="green" style={{ borderRadius: "999px" }}>
                  25%
                </Tag>
              </div>
              <Progress
                percent={25}
                showInfo={false}
                strokeColor="#22c55e"
                railColor={isDarkMode ? "#334155" : "#bbf7d0"}
                size={{ strokeWidth: 10 }}
              />
            </div>
          </Card>
        </Col>
      </Row>
      )}
    </div>
  );
};

export default DashboardCards;

import React, { useState, useEffect } from "react";
import { App, Card, Space, Typography, Tabs } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import SearchBar from "../../Components/Search/SearchBar";
import UsersTabs from "../../Components/Tabs/Admin/UsersTabs";
import PerformanceUsers from "../../Components/Analytics/Admin/PerformanceUsers";
import AllProjectsTable from "../../Components/Table/Admin/AllProjectsTable";
import ProjectModal from "../../Components/Modals/ProjectModal";
import ManagerModal from "../../Components/Modals/Admin/ManagerModal";
import { api } from "../../config/http";
import { userToManagerModalShape } from "../../utils/userRole";

const { Title, Text } = Typography;

const UsersProjectsManagement = () => {
  const { message } = App.useApp();
  const { isDarkMode } = useTheme();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [userDirectory, setUserDirectory] = useState([]);

  useEffect(() => {
    api
      .get("/api/admin/users")
      .then((r) => setUserDirectory(r.data || []))
      .catch(() => setUserDirectory([]));
  }, []);

  const handleViewProjectDetails = (record) => {
    setSelectedProject(record);
    setProjectModalOpen(true);
  };

  const handleViewManagerDetails = (record) => {
    const mid = record.managerId ?? Number(record.projectManagerId);
    const u = userDirectory.find((x) => x.id === mid);
    const mgr = userToManagerModalShape(u);
    if (mgr) {
      setSelectedManager(mgr);
      setViewModalOpen(true);
    } else {
      message.info("Manager details not available");
    }
  };

  const tabItems = [
    {
      key: "users",
      label: "Users List",
      children: (
        <div style={{ paddingTop: "24px" }}>
          <PerformanceUsers />
          <Card
            style={{
              borderRadius: "20px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              marginTop: "24px",
              overflow: "hidden",
              backgroundColor: isDarkMode ? "#1e293b" : "white",
            }}
          >
            <div
              style={{
                padding: "24px 24px 0 24px",
                borderBottom: `1px solid ${isDarkMode ? "#334155" : "#f1f5f9"}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <Space orientation="vertical" size={4}>
                  <Title
                    level={4}
                    style={{ margin: 0, fontWeight: 600, color: isDarkMode ? "#e2e8f0" : "#1e293b" }}
                  >
                    User Management
                  </Title>
                  <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? "#94a3b8" : "" }}>
                    Manage all users in the system (Managers & Members)
                  </Text>
                </Space>
                <SearchBar />
              </div>
            </div>

            <UsersTabs />
          </Card>
        </div>
      ),
    },
    {
      key: "projects",
      label: "All Projects",
      children: (
        <div style={{ paddingTop: "24px" }}>
          <Card
            style={{
              borderRadius: "20px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              overflow: "hidden",
              backgroundColor: isDarkMode ? "#1e293b" : "white",
            }}
          >
            <div
              style={{
                padding: "24px",
                borderBottom: `1px solid ${isDarkMode ? "#334155" : "#f1f5f9"}`,
              }}
            >
              <Space orientation="vertical" size={4}>
                <Title
                  level={4}
                  style={{ margin: 0, fontWeight: 600, color: isDarkMode ? "#e2e8f0" : "#1e293b" }}
                >
                  Projects Management
                </Title>
                <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? "#94a3b8" : "" }}>
                  Browse and inspect all projects with manager details.
                </Text>
              </Space>
            </div>

            <AllProjectsTable
              handleViewProjectDetails={handleViewProjectDetails}
              handleViewManagerDetails={handleViewManagerDetails}
            />
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div 
      style={{ 
        padding: "24px", 
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#0f172a" : "transparent"
      }}
    >
      <div data-aos="zoom-out">
        <Card
          style={{
            borderRadius: "20px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            marginBottom: "24px",
            backgroundColor: isDarkMode ? "#1e293b" : "white",
          }}
        >
          <Space orientation="vertical" size={4} style={{ width: "100%" }}>
            <Title level={3} style={{ margin: 0, fontWeight: 600, color: isDarkMode ? "#e2e8f0" : "" }}>
              Users & Projects Management
            </Title>
            <Text type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "" }}>
              Manage all users and projects in your system.
            </Text>
          </Space>
        </Card>

        <Tabs
          defaultActiveKey="users"
          size="large"
          items={tabItems}
          animated={{ inkBar: true, tabPane: true }}
        />
      </div>

      <ProjectModal
        open={projectModalOpen}
        setOpen={setProjectModalOpen}
        project={selectedProject}
      />
      <ManagerModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedManager={selectedManager}
      />
    </div>
  );
};

export default UsersProjectsManagement;

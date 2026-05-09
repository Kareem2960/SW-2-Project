import { Table, Card, Space, Typography } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import SearchBar from "../../Components/Search/SearchBar";
import UsersTabs from "../../Components/Tabs/Admin/UsersTabs";
import PerformanceUsers from "../../Components/Analytics/Admin/PerformanceUsers";

const { Title, Text } = Typography;

// ===== STATIC DATA =====

const UsersManagement = () => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      style={{ 
        padding: "24px", 
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#0f172a" : "transparent"
      }}
    >
      <div data-aos="zoom-out">
        {/* Statistics Cards */}

        <PerformanceUsers />
        {/* Main Card */}
        <Card
          style={{
            borderRadius: "20px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            backgroundColor: isDarkMode ? "#1e293b" : "white",
          }}
          styles={{ body: { padding: "0" } }}
        >
          {/* Header */}
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
    </div>
  );
};

export default UsersManagement;

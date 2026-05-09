import { Card, Space, Typography } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import ManagersTabs from "../../Components/Tabs/Admin/ManagersTabs";

const { Title, Text } = Typography;

// ===== MAIN COMPONENT =====
const ManagersManagement = () => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      style={{ 
        padding: "24px", 
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#0f172a" : "transparent"
      }}
    >
      <div data-aos="fade-right">
        <Card
          style={{
            borderRadius: 12,
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
            backgroundColor: isDarkMode ? "#1e293b" : "white",
          }}
          styles={{ body: { padding: "24px" } }}
        >
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Title level={3} style={{ margin: 0, fontWeight: 500, color: isDarkMode ? "#e2e8f0" : "" }}>
                  Project Managers
                </Title>
                <Text type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "" }}>
                  Manage registrations and access for project managers
                </Text>
              </div>
            </div>

            {/* Tabs for Pending vs All */}
            <ManagersTabs />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ManagersManagement;

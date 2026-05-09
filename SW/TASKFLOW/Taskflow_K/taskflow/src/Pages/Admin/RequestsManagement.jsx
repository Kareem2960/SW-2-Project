import { Card, Space, Typography } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import ManagersTabs from "../../Components/Tabs/Admin/ManagersTabs";
import RequestProjectsTabs from "../../Components/Tabs/Admin/RequestProjectsTabs";

const { Title, Text } = Typography;

const RequestsManagement = () => {
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
          }}
          styles={{ body: { padding: "24px" } }}
        >
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <Title level={3} style={{ margin: 0, fontWeight: 500 }}>
                  Approval Requests
                </Title>
                <Text type="secondary">
                  Review all pending manager and project approval requests from
                  one consolidated page.
                </Text>
              </div>
            </div>
          </Space>
        </Card>
      </div>

      <div data-aos="fade-left" style={{ marginTop: "24px" }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
            overflow: "hidden",
          }}
          styles={{ body: { padding: "24px" } }}
        >
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                Manager Requests
              </Title>
              <Text type="secondary">
                Manage project manager registrations, approvals, and access
                control.
              </Text>
            </div>
            <ManagersTabs />
          </Space>
        </Card>
      </div>

      <div data-aos="fade-left" style={{ marginTop: "24px" }}>
        <Card
          style={{
            borderRadius: 12,
            boxShadow:
              "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
            overflow: "hidden",
          }}
          styles={{ body: { padding: "24px" } }}
        >
          <Space orientation="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                Project Requests
              </Title>
              <Text type="secondary">
                Review incoming project submissions and confirm project
                approvals.
              </Text>
            </div>
            <RequestProjectsTabs />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default RequestsManagement;

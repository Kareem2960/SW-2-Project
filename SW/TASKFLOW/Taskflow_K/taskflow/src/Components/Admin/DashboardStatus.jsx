// ==================== Ant Design ====================
import { Card, Row, Col, Typography, Tag, theme } from "antd";
// ==================== Icons ====================
import { Activity, Database, Users } from "lucide-react";
// ==================== Context ====================
import { useTheme } from "../../Context/DarkModeProvider";

const { Title, Text } = Typography;

const DashboardStatus = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  return (
    <div style={{ marginTop: "32px" }}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Activity size={24} color="#22c55e" />
            <Title level={4} style={{ margin: 0 }}>System Status</Title>
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          {/* System Health */}
          <Col xs={24} sm={8}>
            <div
              style={{
                border: isDarkMode ? "1px solid #303030" : "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                background: isDarkMode ? token.colorBgContainer : "white",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Activity size={24} color="#22c55e" />
                </div>
                <div>
                  <Title level={5} style={{ margin: 0, marginBottom: "4px", color: isDarkMode ? token.colorText : "inherit" }}>
                    System Health
                  </Title>
                  <Tag color="success" style={{ margin: 0 }}>Healthy</Tag>
                </div>
              </div>
              <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                All systems operational
              </Text>
            </div>
          </Col>

          {/* Database Status */}
          <Col xs={24} sm={8}>
            <div
              style={{
                border: isDarkMode ? "1px solid #303030" : "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                background: isDarkMode ? token.colorBgContainer : "white",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Database size={24} color="#3b82f6" />
                </div>
                <div>
                  <Title level={5} style={{ margin: 0, marginBottom: "4px", color: isDarkMode ? token.colorText : "inherit" }}>
                    Database Status
                  </Title>
                  <Tag color="processing" style={{ margin: 0 }}>Active</Tag>
                </div>
              </div>
              <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                Connected and responsive
              </Text>
            </div>
          </Col>

          {/* Active Sessions */}
          <Col xs={24} sm={8}>
            <div
              style={{
                border: isDarkMode ? "1px solid #303030" : "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                background: isDarkMode ? token.colorBgContainer : "white",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#ede9fe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Users size={24} color="#8b5cf6" />
                </div>
                <div>
                  <Title level={5} style={{ margin: 0, marginBottom: "4px", color: isDarkMode ? token.colorText : "inherit" }}>
                    Active Sessions
                  </Title>
                  <Tag color="purple" style={{ margin: 0 }}>5</Tag>
                </div>
              </div>
              <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                5 users online
              </Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardStatus;

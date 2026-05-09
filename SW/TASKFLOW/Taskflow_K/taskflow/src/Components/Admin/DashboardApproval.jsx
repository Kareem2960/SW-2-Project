import React from 'react';
// ==================== Ant Design ====================
import { App, Card, Row, Col, Typography, Button, Avatar, Tag, Space, theme } from "antd";
// ==================== Icons ====================
import { User, Mail, Building2, Calendar, Check, X } from "lucide-react";
// ==================== Context ====================
import { useTheme } from "../../Context/DarkModeProvider";
import { api } from "../../config/http";

const { Title, Text } = Typography;

const DashboardApproval = () => {
  const { message } = App.useApp();
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  const [pendingManagers, setPendingManagers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchPendingManagers();
  }, []);

  const fetchPendingManagers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/pending-managers");
      const managers = response.data.map((user, index) => ({
        id: user.id,
        name: user.userName,
        email: user.userName,
        company: "Not specified",
        role: "Project Manager",
        requestDate: new Date().toISOString().split('T')[0],
        avatar: user.userName.charAt(0).toUpperCase(),
        avatarColor: ["#3b82f6", "#8b5cf6", "#22c55e", "#ec4899"][index % 4],
      }));
      setPendingManagers(managers);
    } catch (error) {
      console.error("Error fetching pending managers:", error);
      message.error("Failed to load pending managers");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (managerId) => {
    try {
      await api.post(`/api/admin/approve/${managerId}`);
      message.success(`${pendingManagers.find(m => m.id === managerId)?.name} has been approved as Project Manager`);
      setPendingManagers(pendingManagers.filter(m => m.id !== managerId));
    } catch (error) {
      console.error("Error approving manager:", error);
      message.error("Failed to approve manager");
    }
  };

  const handleReject = async (managerId) => {
    try {
      await api.post(`/api/admin/reject/${managerId}`);
      message.warning(`${pendingManagers.find(m => m.id === managerId)?.name} request has been rejected`);
      setPendingManagers(pendingManagers.filter(m => m.id !== managerId));
    } catch (error) {
      console.error("Error rejecting manager:", error);
      message.error("Failed to reject manager");
    }
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={24} color="#f97316" />
            <Title level={4} style={{ margin: 0 }}>Pending Project Manager Approvals</Title>
            <Tag color="orange" style={{ marginLeft: "8px" }}>{pendingManagers.length}</Tag>
          </div>
        }
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: isDarkMode ? token.colorText : "#6b7280" }}>
            Loading pending managers...
          </div>
        ) : pendingManagers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: isDarkMode ? token.colorText : "#6b7280" }}>
            <User size={48} style={{ marginBottom: "16px", color: isDarkMode ? "#64748b" : "#94a3b8" }} />
            <Title level={5} style={{ marginBottom: "8px", color: isDarkMode ? token.colorText : "#1e293b" }}>
              No pending approvals to review
            </Title>
            <Text style={{ color: isDarkMode ? token.colorTextSecondary : "#64748b" }}>
              All manager requests have been processed
            </Text>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pendingManagers.map((manager) => (
            <div
              key={manager.id}
              style={{
                border: isDarkMode ? "1px solid #303030" : "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                background: isDarkMode ? token.colorBgContainer : "white",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Avatar */}
              <Avatar
                size={64}
                style={{
                  backgroundColor: manager.avatarColor,
                  fontSize: "24px",
                  fontWeight: "600",
                  flexShrink: 0,
                }}
              >
                {manager.avatar}
              </Avatar>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <Title level={5} style={{ margin: 0, color: isDarkMode ? token.colorText : "inherit" }}>
                    {manager.name}
                  </Title>
                  <Tag color="blue" style={{ margin: 0 }}>{manager.role}</Tag>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Mail size={16} color={isDarkMode ? token.colorText : "#6b7280"} />
                    <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                      {manager.email}
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Building2 size={16} color={isDarkMode ? token.colorText : "#6b7280"} />
                    <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                      {manager.company}
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={16} color={isDarkMode ? token.colorText : "#6b7280"} />
                    <Text type="secondary" style={{ fontSize: "14px", color: isDarkMode ? token.colorTextSecondary : "inherit" }}>
                      Requested: {manager.requestDate}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <Space>
                <Button
                  type="primary"
                  icon={<Check size={16} />}
                  onClick={() => handleApprove(manager.id)}
                  style={{
                    background: "#22c55e",
                    borderColor: "#22c55e",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  Approve
                </Button>
                <Button
                  danger
                  icon={<X size={16} />}
                  onClick={() => handleReject(manager.id)}
                  style={{
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  Reject
                </Button>
              </Space>
            </div>
          ))}
        </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardApproval;

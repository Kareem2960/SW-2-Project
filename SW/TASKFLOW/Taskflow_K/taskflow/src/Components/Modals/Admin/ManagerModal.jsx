import { Tag, Button, Space, Typography, Avatar, Modal } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ManagerModal = ({ viewModalOpen, setViewModalOpen, selectedManager }) => {
  return (
    <Modal
      title={
        <Space>
          <UserOutlined />
          <span>Manager Details</span>
        </Space>
      }
      open={viewModalOpen}
      onCancel={() => setViewModalOpen(false)}
      footer={[
        <Button key="close" onClick={() => setViewModalOpen(false)}>
          Close
        </Button>,
        selectedManager?.status === "pending" && (
          <Button
            key="approve"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => {
              if (selectedManager) {
                //   handleApprove(selectedManager);
                setViewModalOpen(false);
              }
            }}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Approve Manager
          </Button>
        ),
        selectedManager?.status === "pending" && (
          <Button
            key="reject"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() => {
              if (selectedManager) {
                //   handleReject(selectedManager);
                setViewModalOpen(false);
              }
            }}
          >
            Reject Manager
          </Button>
        ),
      ]}
      width={500}
    >
      {selectedManager && (
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Avatar
              size={64}
              style={{ backgroundColor: selectedManager.avatarColor }}
            >
              {selectedManager.name.charAt(0)}
            </Avatar>
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {selectedManager.name}
              </Title>
              <Tag
                color={
                  selectedManager.status === "pending"
                    ? "gold"
                    : selectedManager.status === "approved"
                      ? "green"
                      : "red"
                }
              >
                {selectedManager.status.toUpperCase()}
              </Tag>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
            <Space orientation="vertical" size={12} style={{ width: "100%" }}>
              <div>
                <Text type="secondary">Email</Text>
                <div>
                  <MailOutlined style={{ marginRight: 8, color: "#1890ff" }} />
                  <Text>{selectedManager.email}</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Phone</Text>
                <div>
                  <PhoneOutlined style={{ marginRight: 8, color: "#52c41a" }} />
                  <Text>{selectedManager.phone}</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Company</Text>
                <div>
                  <Tag color="geekblue">{selectedManager.company}</Tag>
                </div>
              </div>
              <div>
                <Text type="secondary">Experience</Text>
                <div>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  <Text>{selectedManager.experience} years</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Registered On</Text>
                <div>
                  <Text>{selectedManager.registeredDate}</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Bio</Text>
                <div
                  style={{
                    background: "#f5f5f5",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text>{selectedManager.bio}</Text>
                </div>
              </div>
            </Space>
          </div>
        </Space>
      )}
    </Modal>
  );
};

export default ManagerModal;

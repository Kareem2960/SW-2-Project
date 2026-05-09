import React, { useState } from "react";
import {
  Card,
  Tag,
  Button,
  Space,
  Typography,
  Badge,
  Empty,
  Row,
  Col,
  Modal,
  Divider,
} from "antd";
import {
  EyeOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const myPendingProjects = [
  {
    id: "PRJ-001",
    name: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with payment integration.",
    members: ["Malak Youssef", "Rawan Ahmed", "Hassan Ibrahim"],
    numOfMembers: 3,
    submittedDate: "2024-03-15",
    status: "pending",
    estimatedDuration: "4 months",
  },
  {
    id: "PRJ-002",
    name: "Task Management App",
    description: "A productivity app for task tracking and team collaboration.",
    members: ["Laila Mostafa", "Omar Hassan", "Ahmed Ali"],
    numOfMembers: 3,
    submittedDate: "2024-03-14",
    status: "pending",
    estimatedDuration: "3 months",
  },
];

const PendingProjects = () => {
  const [projects, setProjects] = useState(myPendingProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedProject(record);
    setModalOpen(true);
  };

  return (
    <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
          My Pending Projects
        </Title>
        <Text type="secondary">Projects waiting for admin approval</Text>
      </div>

      {projects.length > 0 ? (
        <Row gutter={[16, 16]}>
          {projects.map((project) => (
            <Col xs={24} sm={12} lg={8} key={project.id}>
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                }}
                styles={{ body: { padding: "16px" } }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <Text strong style={{ fontSize: "16px" }}>
                      {project.name}
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Tag color="geekblue" style={{ fontSize: "11px" }}>
                        {project.id}
                      </Tag>
                    </div>
                  </div>
                  <Badge status="warning" text="Pending" />
                </div>

                <Divider style={{ margin: "12px 0" }} />

                {/* Team Info */}
                <div style={{ marginBottom: "12px" }}>
                  <Space>
                    <TeamOutlined style={{ color: "#94a3b8" }} />
                    <Text type="secondary">
                      {project.numOfMembers} Team Members
                    </Text>
                  </Space>
                </div>

                {/* Submitted Date */}
                <div style={{ marginBottom: "16px" }}>
                  <Space>
                    <CalendarOutlined style={{ color: "#94a3b8" }} />
                    <Text type="secondary">
                      Submitted: {project.submittedDate}
                    </Text>
                  </Space>
                </div>

                {/* View Button */}
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetails(project)}
                  style={{ width: "100%" }}
                >
                  View Details
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card
          style={{ borderRadius: "12px", textAlign: "center", padding: "40px" }}
        >
          <Empty description="No pending projects" />
        </Card>
      )}

      {/* Project Details Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={500}
        footer={[
          <Button key="close" onClick={() => setModalOpen(false)}>
            Close
          </Button>,
        ]}
        title={
          <Space>
            <FileTextOutlined style={{ color: "#6366f1" }} />
            <span>Project Details</span>
          </Space>
        }
      >
        {selectedProject && (
          <div>
            <Title level={5}>{selectedProject.name}</Title>
            <Tag color="geekblue">{selectedProject.id}</Tag>

            <Divider />

            <Text strong>Description</Text>
            <Paragraph style={{ marginTop: "8px" }}>
              {selectedProject.description}
            </Paragraph>

            <Text strong>Team Members</Text>
            <div style={{ marginTop: "8px", marginBottom: "16px" }}>
              <Space wrap>
                {selectedProject.members.map((member, idx) => (
                  <Tag key={idx} icon={<UserOutlined />} color="blue">
                    {member}
                  </Tag>
                ))}
              </Space>
            </div>

            <Text strong>Timeline</Text>
            <div style={{ marginTop: "8px" }}>
              <Space orientation="vertical">
                <Text type="secondary">
                  <CalendarOutlined /> Submitted:{" "}
                  {selectedProject.submittedDate}
                </Text>
                <Text type="secondary">
                  <ClockCircleOutlined /> Estimated:{" "}
                  {selectedProject.estimatedDuration}
                </Text>
              </Space>
            </div>

            <Divider />

            <Badge status="warning" text="Waiting for admin approval" />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingProjects;

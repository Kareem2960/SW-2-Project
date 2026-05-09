// ==================== Ant Design  ====================

import { Card, Progress, Tag, Avatar, Space, Typography } from "antd";
import {
  FaRegCheckSquare,
  FaUser,
  FaRegCalendarAlt,
} from "react-icons/fa";
// ==================== Constants  ====================

import { purple } from "../../Constants/Colors";
import { useTheme } from "../../Context/DarkModeProvider";

const { Title, Text, Paragraph } = Typography;

// From API

const ProjectCard = ({ project }) => {
  const { isDarkMode } = useTheme();

  return (
    <Card
      hoverable
      style={{ height: "100%", backgroundColor: isDarkMode ? "#1e293b" : "#ffffff" }}
      styles={{ body: { padding: 24 } }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
        }}
      >
        <Title level={4} style={{ margin: 0, color: isDarkMode ? "#e2e8f0" : "#333" }}>
          {project.title}
        </Title>
        <Tag
          color="success"
          style={{
            borderRadius: "12px",
            border: "none",
            backgroundColor: isDarkMode ? "#1e3a2f" : "#f6ffed",
            color: isDarkMode ? "#52c41a" : "#52c41a",
            fontWeight: 500,
          }}
        >
          {project.status}
        </Tag>
      </div>

      {/* Description */}
      <Paragraph type="secondary" style={{ marginBottom: "24px", color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}>
        {project.description}
      </Paragraph>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Text strong type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}>
            Progress
          </Text>
          <Text strong style={{ color: isDarkMode ? "#e2e8f0" : "#333" }}>{project.progress}%</Text>
        </div>
        <Progress
          percent={project.progress}
          showInfo={false}
          strokeColor={purple}
          trail={isDarkMode ? "#334155" : "#e0e7ff"}
          size={{ strokeWidth: 20 }}
        />
      </div>

      {/* Tasks Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Space>
          <FaRegCheckSquare style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }} />
          <Text type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}>Tasks</Text>
        </Space>
        <Text strong style={{ color: isDarkMode ? "#e2e8f0" : "#333" }}>
          {project.tasksCompleted}/{project.totalTasks}
        </Text>
      </div>

      {/* Team Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Space>
          <FaUser style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }} />
          <Text type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}>Team</Text>
        </Space>
        <Avatar.Group max={{ count: 2 }} size="medium">
          {project.team.map((member) => (
            <Avatar key={member.id} style={{ backgroundColor: member.color }}>
              {member.name}
            </Avatar>
          ))}
        </Avatar.Group>

      </div>

      {/* Due Date Section */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <FaRegCalendarAlt style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }} />
        <Text type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}>Due {project.dueDate}</Text>
      </div>
    </Card>
  );
};

export default ProjectCard;

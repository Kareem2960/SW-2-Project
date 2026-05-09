// ==================== Ant Deisgn  ====================

import { Modal, Typography, Tag, Space,  Button } from "antd";
import { 
  CalendarOutlined, 
  UserOutlined, 
  FileTextOutlined,
  TeamOutlined 
} from "@ant-design/icons";
// ==================== Constants  ====================

import { primaryColor } from "../../Constants/Colors";

const { Title, Text, Paragraph } = Typography;

const ProjectModal = ({ open, setOpen, project }) => {
  project = {
    name: "Taskflow Project",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, sequi excepturi? Soluta nemo laboriosam, nulla accusantium amet, ex, ad libero doloribus quod impedit rem ab nostrum quo suscipit fugit eum!",
    startTime: "2024-01-15",
    endTime: "2024-04-30",
    members: ["Malak", "Rawan", "Hassan"],
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
     
      width={600}
      title={
        <Space>
          <FileTextOutlined style={{ color: primaryColor }} />
          <span style={{ fontSize: "20px", fontWeight: 600 }}>Project Review</span>
        </Space>
      }
    >
      <div style={{ padding: "8px 0" }}>
        {/* Project Name */}
        <Title level={4} style={{ marginBottom: "16px", color: "#1a1a1a" }}>
          {project.name}
        </Title>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <Text strong style={{ display: "block", marginBottom: "8px" }}>
            <FileTextOutlined style={{ marginRight: "8px", color: primaryColor }} />
            Description
          </Text>
          <Paragraph style={{ marginBottom: 0, color: primaryColor}}>
            {project.desc}
          </Paragraph>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: "20px" }}>
          <Text strong style={{ display: "block", marginBottom: "8px" }}>
            <CalendarOutlined style={{ marginRight: "8px", color: primaryColor }} />
            Timeline
          </Text>
          <Space orientation="vertical" size={4}>
            <Text type="secondary">Start: <strong>{project.startTime || "Not set"}</strong></Text>
            <Text type="secondary">End: <strong>{project.endTime || "Not set"}</strong></Text>
          </Space>
        </div>

        {/* Team Members */}
        <div>
          <Text strong style={{ display: "block", marginBottom: "8px" }}>
            <TeamOutlined style={{ marginRight: "8px", color: primaryColor }} />
            Team Members ({project.members.length})
          </Text>
          <Space wrap size="middle">
            {project.members.map((member, index) => (
              <Tag key={index} icon={<UserOutlined />} color="blue" style={{ padding: "4px 12px" }}>
                {member}
              </Tag>
            ))}
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;
import { Tag, Button, Space, Badge, Typography, Tooltip, Avatar } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectsColumns = (
  handleViewProjectDetails,
  handleViewManagerDetails,
) => [
  {
    title: "Project ID",
    dataIndex: "id",
    key: "id",
    render: (id) => (
      <Typography.Text strong style={{ color: "#1890ff" }}>
        {id}
      </Typography.Text>
    ),
  },
  {
    title: "Project Name",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <Link
        to={`${record.id}`}
        style={{
          fontWeight: 600,
          color: "#1677ff",
          display: "block",
        }}
      >
        {name}
      </Link>
    ),
  },
  {
    title: "Project Manager",
    dataIndex: "projectManager",
    key: "projectManager",
    render: (manager, record) => (
      <Space>
        <Avatar
          size="small"
          icon={<UserOutlined />}
          style={{ backgroundColor: "#87d068" }}
        />
        <Typography.Text
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => handleViewManagerDetails(record)}
        >
          {manager}
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: "Team Size",
    dataIndex: "numOfMembers",
    key: "numOfMembers",
    render: (num, record) => {
      const labels = Array.isArray(record.members) ? record.members : [];
      const tip = labels.length ? labels.join(", ") : "—";
      return (
        <Tooltip title={`Members: ${tip}`}>
          <Tag icon={<TeamOutlined />} color="cyan">
            {num} Members
          </Tag>
        </Tooltip>
      );
    },
  },
  {
    title: "Submitted",
    dataIndex: "submittedDate",
    key: "submittedDate",
    render: (date) => (
      <Space>
        <CalendarOutlined style={{ color: "#faad14" }} />
        <Typography.Text type="secondary">{date}</Typography.Text>
      </Space>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let text = "";
      if (status === "pending") {
        text = "Pending";
      } else if (status === "approved") {
        text = "Approved";
      } else {
        text = "Rejected";
      }
      return (
        <Badge
          status={
            status === "pending"
              ? "warning"
              : status === "approved"
                ? "success"
                : "error"
          }
          text={text}
        />
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Tooltip title="View Project Details">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewProjectDetails(record)}
          />
        </Tooltip>
        {record.status === "pending" && (
          <>
            <Tooltip title="Approve">
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                size="small"
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              />
            </Tooltip>
            <Tooltip title="Reject">
              <Button danger icon={<CloseCircleOutlined />} size="small" />
            </Tooltip>
          </>
        )}
      </Space>
    ),
  },
];

export default ProjectsColumns;

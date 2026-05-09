import { 
  Space, 
  Avatar, 
  Typography, 
  Tag, 
  Tooltip, 
  Button 
} from 'antd';

import {
  MailOutlined,
  PhoneOutlined,
  CrownOutlined,
  TeamOutlined,
  CalendarOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const MemberColumns = (handleViewDetails) => [
  {
    title: "User",
    key: "user",
    width: 250,
    render: (_, record) => (
      <Space>
        <Avatar size={40} style={{ backgroundColor: record.avatarColor }}>
          {record.name.charAt(0)}
        </Avatar>
        <Space orientation="vertical" size={0}>
          <Text strong>{record.name}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            ID: {record.id}
          </Text>
        </Space>
      </Space>
    ),
  },
  {
    title: "Contact",
    key: "contact",
    render: (_, record) => (
      <Space orientation="vertical" size={2}>
        <Space size="small">
          <MailOutlined style={{ color: "#1890ff" }} />
          <Text style={{ fontSize: 13 }}>{record.email}</Text>
        </Space>
        <Space size="small">
          <PhoneOutlined style={{ color: "#52c41a" }} />
          <Text style={{ fontSize: 13 }}>{record.phone}</Text>
        </Space>
      </Space>
    ),
  },
  {
    title: "Role",
    dataIndex: "roleName",
    key: "role",
    render: (roleName, record) => (
      <Tag
        icon={record.role === "manager" ? <CrownOutlined /> : <TeamOutlined />}
        color={record.role === "manager" ? "gold" : "blue"}
      >
        {roleName}
      </Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const config = {
        active: { color: "#10b981", bg: "#d1fae5", text: "Active" },
        inactive: { color: "#6b7280", bg: "#f3f4f6", text: "Inactive" },
        pending: { color: "#f59e0b", bg: "#fef3c7", text: "Pending" },
      };
      const style = config[status] || config.inactive;
      return (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "20px",
            backgroundColor: style.bg,
            color: style.color,
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {style.text}
        </span>
      );
    },
  },
  {
    title: "Projects",
    dataIndex: "projectsCount",
    key: "projectsCount",
    render: (count) => <Tag color="cyan">{count} projects</Tag>,
    sorter: (a, b) => a.projectsCount - b.projectsCount,
  },
  {
    title: "Registered",
    dataIndex: "registeredDate",
    key: "registeredDate",
    render: (date) => (
      <Space>
        <CalendarOutlined style={{ color: "#94a3b8" }} />
        <Text type="secondary">{date}</Text>
      </Space>
    ),
    sorter: (a, b) => new Date(a.registeredDate) - new Date(b.registeredDate),
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            style={{ color: "#6366f1" }}
          />
        </Tooltip>
      </Space>
    ),
  },
];

export default MemberColumns;

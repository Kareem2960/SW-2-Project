import { Button, Space, Typography, Avatar, Badge, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const ManagersColumns = (handleViewDetails) => [
  {
    title: "Manager",
    dataIndex: "name",
    key: "name",
    render: (name, record) => (
      <Space>
        <Avatar
          style={{ backgroundColor: record.avatarColor }}
          icon={<UserOutlined />}
        />
        <Space orientation="vertical" size={0}>
          <Typography.Text strong>{name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            ID: {record.id}
          </Typography.Text>
        </Space>
      </Space>
    ),
  },
  {
    title: "Contact",
    key: "contact",
    render: (_, record) => (
      <Space orientation="vertical" size={0}>
        {" "}
        {/* Fixed direction */}
        <Space size="small">
          <MailOutlined style={{ color: "#1890ff", fontSize: 12 }} />
          <Typography.Text size="small">{record.email}</Typography.Text>
        </Space>
        <Space size="small">
          <PhoneOutlined style={{ color: "#52c41a", fontSize: 12 }} />
          <Typography.Text type="secondary">{record.phone}</Typography.Text>
        </Space>
      </Space>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      const config = {
        pending: { status: "warning", text: "Pending" },
        approved: { status: "success", text: "Approved" },
        rejected: { status: "error", text: "Rejected" },
      };
      return (
        <Badge status={config[status].status} text={config[status].text} />
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
    fixed: window.innerWidth >= 768 ? "right" : false,
    render: (_, record) => (
      <Space>
        <Tooltip title="View Details">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetails(record)}
          />
        </Tooltip>
        {record.status === "pending" && (
          <>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              size="small"
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            />
            <Button danger icon={<CloseCircleOutlined />} size="small" />
          </>
        )}
      </Space>
    ),
  },
];

export default ManagersColumns;

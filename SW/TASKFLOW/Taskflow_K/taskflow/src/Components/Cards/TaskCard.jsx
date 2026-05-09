import React from 'react';
import { Card, Avatar, Space, Tag, Typography, Grid, Tooltip } from "antd";
import { ClockCircleOutlined, UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { GetStatusText } from "../../Functions/Tasks/GetStatusText";
import getStatusColor from "../../Functions/Tasks/GetStatusColor";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const TaskCard = ({ task }) => {
  const screens = useBreakpoint();
  
  const isXs = screens.xs && !screens.sm; 
  const isMobile = !screens.md;

  const statusColors = {
    completed: "#52c41a",
    "in-progress": "#1890ff",
    pending: "#faad14",
  };

  const currentStatusColor = statusColors[task.status] || "#d9d9d9";

  return (
    <Card
      hoverable
      styles={{
        body: { padding: isMobile ? "12px" : "16px" }
      }}
      style={{
        borderLeft: `4px solid ${currentStatusColor}`,
        borderRadius: "8px",
        transition: "all 0.3s ease",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
        
        {/* Row 1: Title & Status Tag */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          gap: "8px" 
        }}>
          <Link
            to={`tasks/${task.id || 1}`}
            style={{ 
              flex: 1, 
              color: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Title 
              level={5} 
              style={{ 
                margin: 0, 
                fontSize: isXs ? "14px" : "16px",
                lineHeight: 1.4
              }}
              ellipsis={{ rows: 2 }} 
            >
              {task.title}
            </Title>
            <ArrowRightOutlined style={{ fontSize: "12px", color: "#bfbfbf" }} />
          </Link>

          <Tag 
            color={getStatusColor(task.status).status} 
            style={{ 
              marginInlineEnd: 0,
              fontSize: "11px",
              borderRadius: "4px",
              padding: "0 4px"
            }}
          >
            {GetStatusText(task.status)}
          </Tag>
        </div>

        {/* Row 2: Description */}
        <div style={{ flex: 1 }}>
          <Text
            type="secondary"
            style={{
              fontSize: isMobile ? "12px" : "13px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {task.desc}
          </Text>
        </div>

        {/* Row 3: Footer (Member & Due Date) */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: "1px solid #f0f0f0"
        }}>
          <Space size={4}>
            <Tooltip title={`${task.member?.name} - ${task.member?.role}`}>
              <Avatar 
                size={24} 
                style={{ backgroundColor: "#1890ff", verticalAlign: 'middle' }}
                icon={<UserOutlined />}
              >
                {task.member?.avatar}
              </Avatar>
            </Tooltip>
            {!isXs && (
              <Text style={{ fontSize: "12px" }} strong>
                {task.member?.name.split(' ')[0]}
              </Text>
            )}
          </Space>

          <Space size={4} style={{ color: "#8c8c8c" }}>
            <ClockCircleOutlined style={{ fontSize: "12px" }} />
            <Text type="secondary" style={{ fontSize: "11px" }}>
              {isXs ? task.due_date : `Due: ${task.due_date}`}
            </Text>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
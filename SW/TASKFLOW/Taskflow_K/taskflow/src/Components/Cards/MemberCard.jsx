import { useState } from "react";

// ==================== Ant Design  ====================

import { Avatar, Button, Card, Flex, Progress, Typography, Grid } from "antd";
import {  UserOutlined } from "@ant-design/icons";
import TasksModal from "../Modals/TasksModal";

const { useBreakpoint } = Grid;

// Reusable style for the small stats squares
const statBoxStyle = {
  flex: 1,
  padding: "12px 8px",
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "1px solid #f0f0f0",
};

const { Title, Text } = Typography;

const MemberCard = ({ member }) => {
  const screens = useBreakpoint();

  const [openMemberModal, setOpenMemberModal] = useState(false);

  return (
    <>
      {openMemberModal && (
        <TasksModal
          modalOpen={openMemberModal}
          setModalOpen={setOpenMemberModal}
        />
      )}

      <Card
        key={member.id}
        hoverable
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          border: "1px solid #f0f0f0",
        }}
        styles={{ body: { padding: screens.xs ? "16px" : "20px" } }}
        onClick={setOpenMemberModal}
      >
        {/* Top Row: Avatar & Info */}
        <Flex
          justify="space-between"
          align={screens.xs ? "center" : "flex-start"}
          style={{ marginBottom: 20 }}
          wrap="wrap"
          gap="small"
        >
          <Flex
            gap="middle"
            align="center"
            style={{ flexWrap: "wrap" }}
            vertical={screens.xs ? "center" : "row"}
          >
            <Avatar
              size={screens.xs ? 44 : 54}
              src="https://randomuser.me/api/portraits/women/44.jpg"
              icon={<UserOutlined />}
            />
            <div style={{ textAlign: screens.xs ? "center" : "left" }}>
              <Title level={screens.xs ? 5 : 5} style={{ margin: 0 }}>
                {member.name}
              </Title>
              <Text
                type="secondary"
                style={{ fontSize: screens.xs ? "11px" : "12px" }}
              >
                {member.email}
              </Text>
            </div>
          </Flex>
        </Flex>

        {/* Stats Boxes Row */}
        <Flex
          gap="small"
          style={{
            marginBottom: 20,
            flexDirection: screens.xs ? "column" : "row",
          }}
          wrap="wrap"
        >
          <div style={statBoxStyle}>
            <Title level={screens.xs ? 5 : 4} style={{ margin: 0 }}>
              {member.tasks}
            </Title>
            <Text type="secondary" style={{ fontSize: "11px" }}>
              Tasks
            </Text>
          </div>
          <div style={statBoxStyle}>
            <Title level={screens.xs ? 5 : 4} style={{ margin: 0 }}>
              {member.done}
            </Title>
            <Text type="secondary" style={{ fontSize: "11px" }}>
              Done
            </Text>
          </div>
          <div style={statBoxStyle}>
            <Title level={screens.xs ? 5 : 4} style={{ margin: 0 }}>
              {member.rate}%
            </Title>
            <Text type="secondary" style={{ fontSize: "11px" }}>
              Rate
            </Text>
          </div>
        </Flex>

        {/* Progress Section */}
        <div>
          <Flex
            justify="space-between"
            style={{ marginBottom: 4 }}
            wrap="wrap"
            gap="4px"
          >
            <Text
              type="secondary"
              style={{ fontSize: screens.xs ? "11px" : "12px" }}
            >
              Completion
            </Text>
            <Text strong style={{ fontSize: screens.xs ? "11px" : "12px" }}>
              {member.completion}%
            </Text>
          </Flex>
          <Progress
            percent={member.completion}
            showInfo={false}
            strokeColor="#d9d9d9"
            railColor="#f5f5f5"
            size={screens.xs ? 6 : 8}
          />
        </div>
      </Card>
    </>
  );
};

export default MemberCard;

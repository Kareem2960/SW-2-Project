import { Button, Typography, Flex, Row, Col } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
// ==================== Cards  ====================

import MemberCard from "../../Cards/MemberCard";

const { Title, Text } = Typography;

const TeamTab = () => {
  // Sample data - replace with your actual state/props
  const members = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "dev1@taskflow.com",
      tasks: 1,
      done: 0,
      rate: 0,
      completion: 0,
    },
       {
      id: 2,
      name: "Emma Wilson",
      email: "dev1@taskflow.com",
      tasks: 1,
      done: 0,
      rate: 0,
      completion: 0,
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="flex-start"
        style={{ marginBottom: 32, flexWrap: "wrap", gap: "1rem" }}
      >
        <div>
          <Title level={4} style={{ margin: 0 }}>
            Team Members
          </Title>
          <Text type="secondary">
            Manage team members and their assignments
          </Text>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="large"
          style={{ borderRadius: "8px" }}
        >
          Add Member
        </Button>
      </Flex>

      {/* Grid of Cards */}

      <Row gutter={[16, 16]} >
        {members.map((member, i) => (
          <Col xs={24} sm={12} xl={6} key={i}>
            <MemberCard member={member} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamTab;

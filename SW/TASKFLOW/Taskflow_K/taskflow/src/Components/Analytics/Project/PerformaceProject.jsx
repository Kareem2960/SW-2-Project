import { Col, Row, Card, Statistic } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const PerformaceProject = () => {
  const Items = [
    {
      title: "Overall Progress",
      value: 65,
      icon: <RocketOutlined />,
      color: "#1890ff",
      prefix: "",
      suffix: "%",
    },
    {
      title: "To Do",
      value: 8,
      icon: <ClockCircleOutlined />,
      color: "#faad14",
      prefix: "",
      suffix: " tasks",
    },
    {
      title: "In Progress",
      value: 12,
      icon: <PlayCircleOutlined />,
      color: "#13c2c2",
      prefix: "",
      suffix: " tasks",
    },
    {
      title: "Completed",
      value: 20,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
      prefix: "",
      suffix: " tasks",
    },
  ];

  return (
    <div style={{ marginBottom: "24px" }}>
      <Row gutter={[16, 16]}>
        {Items.map((item, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card
              hoverable
              style={{
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Statistic
                title={item.title}
                value={item.value}
                prefix={item.icon}
                suffix={item.suffix}
                styles={{ content: { color: item.color, fontSize: "20px" } }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PerformaceProject;

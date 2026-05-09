import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Row,
  Col,
  Grid,
  Space,
  Divider,
  Card,
  Statistic,
} from "antd";
import {
  UnorderedListOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

// ==================== Components ====================
import BackBtn from "../../Components/Buttons/BackBtn";
import TaskCard from "../../Components/Cards/TaskCard";
import { taskService } from "../../services/taskService";
import { projectService } from "../../services/projectService";
import { normalizeTaskUiStatus, taskToCard } from "../../utils/taskStatus";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Tasks = () => {
  const { projectId } = useParams();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const [tasksRes, projectRes] = await Promise.all([
        taskService.getTasksByProject(projectId),
        projectService.getById(projectId).catch(() => ({ name: `Project ${projectId}` })),
      ]);

      const formattedTasks = tasksRes.map((t) => taskToCard(t));
      setTasks(formattedTasks);
      setProjectData(projectRes);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const stats = [
    {
      title: "Total",
      value: tasks.length,
      icon: <UnorderedListOutlined />,
      color: "#1890ff",
    },
    {
      title: "Completed",
      value: tasks.filter((t) => normalizeTaskUiStatus(t.status) === "completed")
        .length,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "In Progress",
      value: tasks.filter((t) => normalizeTaskUiStatus(t.status) === "in-progress")
        .length,
      icon: <SyncOutlined spin />,
      color: "#1890ff",
    },
  ];

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "32px",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
        ) : (
          <>
        {/* Header Section */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Space orientation="vertical" size={0}>
              <BackBtn />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: 16,
                }}
              >
                <Title level={isMobile ? 3 : 2} style={{ margin: 0 }}>
                  Project Tasks
                </Title>
              </div>
            </Space>
          </Col>
          {!isMobile && (
            <Col>
              <Text type="secondary">
                Project: <strong>{projectData?.name || "Loading..."}</strong>
              </Text>
            </Col>
          )}
        </Row>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {stats.map((s, i) => (
            <Col xs={12} sm={8} key={i}>
              <Card
                styles={{ body: { padding: isMobile ? 12 : 20 } }}
                style={{ borderRadius: 12 }}
              >
                <Statistic
                  title={
                    <Text type="secondary" strong>
                      {s.title}
                    </Text>
                  }
                  value={s.value}
                  prefix={s.icon}
                  styles={{ content: { color: s.color, fontWeight: 700 } }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Divider>Tasks List</Divider>

        {/* Tasks Grid */}
        <Row gutter={[16, 16]}>
          {tasks.map((task) => (
            <Col key={task.id} xs={24} xl={12}>
              <TaskCard task={task} />
            </Col>
          ))}
        </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;

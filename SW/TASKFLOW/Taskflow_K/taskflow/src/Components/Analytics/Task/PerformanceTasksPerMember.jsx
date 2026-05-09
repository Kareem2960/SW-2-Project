import { Progress, Card, Row, Col, Typography, Statistic, Spin } from "antd";
import {
  CheckOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { green, primaryColor } from "../../../Constants/Colors";
import { taskService } from "../../../services/taskService";
import { normalizeTaskUiStatus } from "../../../utils/taskStatus";

const { Title, Text } = Typography;

const PerformanceTasksPerMember = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const rows = await taskService.getAllTasks();
        if (!cancel) setTasks(Array.isArray(rows) ? rows : []);
      } catch (e) {
        console.error(e);
        if (!cancel) setTasks([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const enriched = tasks.map((t) => ({
    ...t,
    ui: normalizeTaskUiStatus(t.status),
    approved:
      normalizeTaskUiStatus(t.status) === "completed" ? true : false,
    priority: t.priority === "High" ? 3 : t.priority === "Medium" ? 2 : 1,
  }));

  const totalTasks = enriched.length;
  const completedTasks = enriched.filter((t) => t.ui === "completed").length;
  const approvedTasks = enriched.filter((t) => t.approved === true).length;
  const pendingTasks = enriched.filter((t) => t.ui === "pending").length;
  const inProgressTasks = enriched.filter((t) => t.ui === "in-progress").length;

  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const approvalRate =
    completedTasks > 0 ? (approvedTasks / completedTasks) * 100 : 0;

  const totalpriority = enriched.reduce((sum, t) => sum + t.priority, 0);
  const earnedpriority = enriched
    .filter((t) => t.ui === "completed")
    .reduce((sum, t) => sum + t.priority, 0);

  const performanceScore =
    totalpriority > 0 ? (earnedpriority / totalpriority) * 100 : 0;

  if (loading) {
    return (
      <Card style={{ marginBottom: 20 }}>
        <div style={{ padding: 32, textAlign: "center" }}>
          <Spin />
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ marginBottom: 20 }}>
      <Title level={4}>Performance Overview</Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Live stats from GET /api/tasks ({totalTasks} task{totalTasks === 1 ? "" : "s"})
      </Text>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completion Rate"
              value={completionRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
            />
            <Progress
              percent={Number(completionRate.toFixed(1))}
              size="small"
              status={completionRate === 100 ? "success" : "active"}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Approval Rate"
              value={approvalRate.toFixed(1)}
              suffix="%"
              prefix={<CheckOutlined />}
            />
            <Progress
              percent={Number(approvalRate.toFixed(1))}
              size="small"
              status={approvalRate === 100 ? "success" : "active"}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Performance Score"
              value={performanceScore.toFixed(1)}
              suffix="%"
              prefix={<FileTextOutlined />}
            />
            <Progress
              percent={Number(performanceScore.toFixed(1))}
              size="small"
              strokeColor={primaryColor}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Row gutter={8}>
              <Col span={12}>
                <Statistic
                  title="Completed"
                  value={completedTasks}
                  suffix={`/ ${totalTasks}`}
                  styles={{ content: { color: green } }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Approved proxy"
                  value={approvedTasks}
                  suffix={`/ ${completedTasks}`}
                  styles={{ content: { color: green } }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Text type="secondary">Pending / To-do</Text>
            <Title level={3} style={{ margin: 0 }}>
              {pendingTasks}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Text type="secondary">In Progress</Text>
            <Title level={3} style={{ margin: 0 }}>
              {inProgressTasks}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Text type="secondary">Earned priority pts</Text>
            <Title level={3} style={{ margin: 0 }}>
              {earnedpriority} / {totalpriority || 0}
            </Title>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default PerformanceTasksPerMember;

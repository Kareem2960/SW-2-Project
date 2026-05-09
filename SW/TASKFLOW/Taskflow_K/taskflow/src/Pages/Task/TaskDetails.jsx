import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  Descriptions,
  Tag,
  Space,
  Typography,
  Grid,
  Spin,
  Alert,
  App,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import BackBtn from "../../Components/Buttons/BackBtn";
import DeleteTaskBtn from "../../Components/Buttons/Task/DeleteTaskBtn";
import getStatusColor from "../../Functions/Tasks/GetStatusColor";
import { GetStatusText } from "../../Functions/Tasks/GetStatusText";
import { taskService } from "../../services/taskService";
import { normalizeTaskUiStatus } from "../../utils/taskStatus";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const priorityBucket = (p) => {
  const raw = String(p ?? "").toLowerCase();
  if (raw === "high" || raw === "3") return { color: "red", text: "High" };
  if (raw === "medium" || raw === "2") return { color: "orange", text: "Medium" };
  if (raw === "low" || raw === "1") return { color: "green", text: "Low" };
  return { color: "default", text: p ?? "Normal" };
};

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const { message } = App.useApp();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTask = useCallback(async () => {
    if (!taskId) return;
    try {
      setLoading(true);
      const row = await taskService.getTaskById(taskId);
      setTask(row);
    } catch (e) {
      console.error(e);
      message.error("Failed to load task");
      setTask(null);
    } finally {
      setLoading(false);
    }
  }, [taskId, message]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const uiStatus = task ? normalizeTaskUiStatus(task.status) : "pending";

  const onDeleted = () => {
    message.success("Task removed");
    navigate(-1);
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: isMobile ? "12px" : "24px",
      }}
    >
      <Card styles={{ body: { padding: isMobile ? "16px" : "24px" } }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            marginBottom: 24,
            gap: isMobile ? "16px" : "0",
          }}
        >
          <Space size={isMobile ? "small" : "middle"}>
            <BackBtn />
            <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
              Task Details
              {task?.id ? (
                <span style={{ marginLeft: 8, opacity: 0.75, fontSize: "0.85em" }}>
                  #{task.id}
                </span>
              ) : null}
            </Title>
          </Space>

          {!loading && task && (
            <DeleteTaskBtn id={task.id} onDeleted={onDeleted} />
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 48 }}>
            <Spin />
          </div>
        ) : !task ? (
          <Alert type="error" description="Task not found or could not load." />
        ) : (
          <>
            <Descriptions
              bordered
              column={isMobile ? 1 : 2}
              layout={isMobile ? "vertical" : "horizontal"}
            >
              <Descriptions.Item label="Title" span={isMobile ? 1 : 2}>
                <strong>{task.title}</strong>
              </Descriptions.Item>

              <Descriptions.Item label="Description" span={isMobile ? 1 : 2}>
                <Paragraph style={{ margin: 0 }}>
                  {task.description || "—"}
                </Paragraph>
              </Descriptions.Item>

              <Descriptions.Item label="Priority">
                <Tag color={priorityBucket(task.priority).color}>
                  {priorityBucket(task.priority).text}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                <Tag
                  color={
                    typeof getStatusColor(uiStatus) === "object"
                      ? getStatusColor(uiStatus).status
                      : "default"
                  }
                >
                  {GetStatusText(task.status)}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Due date">
                <strong>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "—"}
                </strong>
              </Descriptions.Item>

              <Descriptions.Item label="Assigned to">
                <strong>
                  {task.assignedUserId != null
                    ? `User ${task.assignedUserId}`
                    : "Unassigned"}
                </strong>
              </Descriptions.Item>

              <Descriptions.Item label="Project">
                #{task.projectId ?? "—"}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  padding: "12px 16px",
                  background: uiStatus === "completed" ? "#f6ffed" : "#e6f4ff",
                  border: `1px solid ${uiStatus === "completed" ? "#b7eb8f" : "#91caff"}`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ExclamationCircleOutlined
                  style={{
                    color: uiStatus === "completed" ? "#52c41a" : "#1677ff",
                    fontSize: 16,
                  }}
                />
                <Typography.Text>
                  {uiStatus === "completed"
                    ? "Marked as done."
                    : "Use My Tasks tab or PUT /api/tasks to update progress."}
                </Typography.Text>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default TaskDetails;

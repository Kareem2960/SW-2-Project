import { Col, Row, Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { taskStatus } from "../../../Constants/TaskConstants";
import TasksCard from "../../Cards/TasksCard";
import { taskService } from "../../../services/taskService";
import { normalizeTaskUiStatus } from "../../../utils/taskStatus";

const StatusTab = () => {
  const { projectId } = useParams();
  const [apiTasks, setApiTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const rows = await taskService.getTasksByProject(projectId);
      setApiTasks(Array.isArray(rows) ? rows : []);
    } catch (e) {
      console.error("StatusTab:", e);
      setApiTasks([]);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  const byColumn = useMemo(() => {
    const buckets = { pending: [], "in-progress": [], completed: [] };
    apiTasks.forEach((t) => {
      const k = normalizeTaskUiStatus(t.status);
      buckets[k]?.push?.(t);
    });
    return buckets;
  }, [apiTasks]);

  if (!projectId) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <div style={{ padding: 48, textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {taskStatus.map((columnKey) => (
            <Col xs={24} xl={12} key={columnKey}>
              <TasksCard status={columnKey} apiTasks={byColumn[columnKey] ?? []} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default StatusTab;

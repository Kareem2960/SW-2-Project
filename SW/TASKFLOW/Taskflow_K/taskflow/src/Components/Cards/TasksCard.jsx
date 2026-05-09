import { Card, Typography, Space, Empty } from "antd";
import TaskCard from "./TaskCard";
import { primaryColor } from "../../Constants/Colors";
import { GetStatusText } from "../../Functions/Tasks/GetStatusText";
import { taskToCard } from "../../utils/taskStatus";

const { Title, Text } = Typography;

const TasksCard = ({ status, apiTasks = [] }) => {
  const tasks = apiTasks.map((t) => taskToCard(t));

  return (
    <Card
      style={{
        borderRadius: "12px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "12px",
        }}
      >
        <Space orientation="vertical" size={4}>
          <Title level={4} style={{ margin: 0, color: primaryColor }}>
            {GetStatusText(status) || "Tasks"}
          </Title>
          <Text type="secondary">
            Total: {tasks.length} task{tasks.length === 1 ? "" : "s"}
          </Text>
        </Space>
      </div>

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {tasks.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`No ${GetStatusText(status)} tasks`}
            style={{ padding: "40px 0" }}
          />
        ) : (
          <Space orientation="vertical" size="16px" style={{ width: "100%" }}>
            {tasks.map((item) => (
              <div key={item.id} className="mb-3">
                <TaskCard task={item} />
              </div>
            ))}
          </Space>
        )}
      </div>
    </Card>
  );
};

export default TasksCard;

import { Button, Popconfirm, Tooltip, App } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { taskService } from "../../../services/taskService";

const DeleteTaskBtn = ({ id, onDeleted }) => {
  const { message } = App.useApp();

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      onDeleted?.();
    } catch (e) {
      console.error(e);
      message.error("Could not delete task");
    }
  };

  return (
    <Popconfirm
      title="Delete Task"
      description="Are you sure you want to delete this task?"
      onConfirm={() => handleDeleteTask(id)}
      okText="Yes"
      cancelText="No"
    >
      <Tooltip title="Delete">
        <Button icon={<DeleteOutlined />} size="small" danger />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteTaskBtn;

import { Button } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";

const AddNewTaskBtn = ({ handleAddTask }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleAddTask}
      style={{ marginBottom: 16 }}
    >
      Add New Task
    </Button>
  );
};

export default AddNewTaskBtn;

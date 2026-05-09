import { Button } from "antd";
import { EditOutlined,  } from "@ant-design/icons";

const EditTaskBtn = ({ record  , handleEditTask}) => {

  return (
    <Button
      icon={<EditOutlined />}
      size="small"
      onClick={() => handleEditTask(record)}
    />
  );
};

export default EditTaskBtn;

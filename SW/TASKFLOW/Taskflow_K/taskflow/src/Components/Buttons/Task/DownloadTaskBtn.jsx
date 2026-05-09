import { Button } from "antd";
import handleDownloadTask from "../../../Functions/Tasks/DowloadTask";
import { DownloadOutlined } from "@ant-design/icons";

const DownloadTaskBtn = ({ record }) => {
  return (
    <Button
      icon={<DownloadOutlined />}
      size="small"
      onClick={() => handleDownloadTask(record)}
    />
  );
};

export default DownloadTaskBtn;

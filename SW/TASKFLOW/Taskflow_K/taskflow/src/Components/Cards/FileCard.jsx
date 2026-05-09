import { Card, Typography, Flex, Button, Avatar, Space, Tooltip, Grid } from "antd";
import {
  DownloadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import getFileIcon from "../../Functions/Tasks/GetFileIcon";
import DownloadTaskBtn from "../Buttons/Task/DownloadTaskBtn";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const FileCard = ({ file }) => {
  const screens = useBreakpoint();
  const fileStyle = getFileIcon(file.type);

  return (
    <Card
      key={file.id}
      hoverable
      styles={{ body: { padding: screens.xs ? "12px 16px" : "12px 20px" } }}
      style={{ borderRadius: "12px", border: "1px solid #f0f0f0" }}
    >
      <Flex 
        justify="space-between" 
        align={screens.xs ? "flex-start" : "center"} 
        wrap="wrap"
        gap="middle"
        vertical={screens.xs}
      >
        {/* Left Side: Icon and Info */}
        <Flex 
          align={screens.xs ? "flex-start" : "center"} 
          gap="middle"
          wrap="wrap"
          vertical={screens.xs && !screens.sm}
        >
          <Avatar
            shape="square"
            size={screens.xs ? 40 : 48}
            style={{
              backgroundColor: fileStyle.bg,
              color: fileStyle.color,
              borderRadius: "8px",
              fontSize: screens.xs ? "16px" : "20px",
            }}
            icon={fileStyle.icon}
          />
          <Flex vertical style={{ flex: 1 }}>
            <Text strong style={{ fontSize: screens.xs ? "13px" : "15px", wordBreak: "break-word" }}>
              {file.name}
            </Text>
            <Text type="secondary" style={{ fontSize: screens.xs ? "11px" : "13px" }}>
              {file.size} • Uploaded by {file.uploadedBy} • {file.date}
            </Text>
          </Flex>
        </Flex>

        {/* Right Side: Actions */}
        <Space wrap style={{ alignSelf: screens.xs ? "flex-end" : "center" }}>
          <DownloadTaskBtn record={file}/>
         
        </Space>
      </Flex>
    </Card>
  );
};

export default FileCard;
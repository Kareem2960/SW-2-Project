// ==================== Ant Deisgn  ====================

import { Input } from "antd";
import Form from "antd/es/form/Form";
import { FileTextOutlined } from "@ant-design/icons";
// ==================== Constants  ====================

import { primaryColor } from "../../../Constants/Colors";

const NameProjectField = () => {
  return (
    <Form.Item 
      label={
        <span>
          <FileTextOutlined
            style={{ marginRight: "8px", color: primaryColor }}
          />
          Project Name
        </span>
      }
      name="projectName"
      rules={[
        { required: true, message: "Please enter the project name!" },
        {
          min: 3,
          message: "Project name must be at least 3 characters!",
        },
        {
          max: 100,
          message: "Project name must be less than 100 characters!",
        },
        {
          pattern: /^[a-zA-Z0-9\s\-_]+$/,
          message:
            "Project name can only contain letters, numbers, spaces, hyphens, and underscores!",
        },
      ]}
      tooltip="Give your project a clear and descriptive name"
    >
      <Input
        placeholder="e.g., E-commerce Platform, Mobile App Development"
        allowClear
        showCount
        maxLength={100}
        style={{ borderRadius: "8px" }}
      />
    </Form.Item>
  );
};

export default NameProjectField;

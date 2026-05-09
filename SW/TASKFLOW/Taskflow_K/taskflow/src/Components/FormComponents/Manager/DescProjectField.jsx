// ==================== Ant Deisgn  ====================

import { Input } from "antd";
import Form from "antd/es/form/Form";
import { FileTextOutlined } from "@ant-design/icons";
// ==================== Constants  ====================

import { primaryColor } from "../../../Constants/Colors";

const { TextArea } = Input;

const DescProjectField = () => {
  return (
    <Form.Item
    
      label={
        <span>
          <FileTextOutlined
            style={{ marginRight: "8px", color: primaryColor }}
          />
          Project Description
        </span>
      }
      name="projectDescription"
      rules={[
        {
          required: true,
          message: "Please enter the project description!",
        },
        {
          min: 10,
          message: "Description must be at least 10 characters!",
        },
        {
          max: 500,
          message: "Description must be less than 500 characters!",
        },
      ]}
      tooltip="Provide a detailed description of your project"
    >
      <TextArea
        placeholder="Describe your project goals, features, requirements, and expected outcomes..."
        rows={6}
        showCount
        maxLength={500}
        style={{ resize: "vertical", borderRadius: "8px" }}
      />
    </Form.Item>
  );
};

export default DescProjectField;

// ==================== Ant Deisgn  ====================

import { Form, Select,  Space,  } from "antd";
import { TeamOutlined } from "@ant-design/icons";
// ==================== Constants  ====================

import { primaryColor } from "../../../Constants/Colors";


const SelectManager = () => {
const options = [
  {
    label: 'Happy',
    value: 'happy',
    emoji: '😄',
    desc: 'Feeling Good',
  },
  {
    label: 'Sad',
    value: 'sad',
    emoji: '😢',
    desc: 'Feeling Blue',
  },
  {
    label: 'Angry',
    value: 'angry',
    emoji: '😡',
    desc: 'Furious',
  },
  {
    label: 'Cool',
    value: 'cool',
    emoji: '😎',
    desc: 'Chilling',
  },
  {
    label: 'Sleepy',
    value: 'sleepy',
    emoji: '😴',
    desc: 'Need Sleep',
  },
];  return (
    <Form.Item
    
      label={
        <span>
          <TeamOutlined style={{ marginRight: "8px", color: primaryColor }} />
          Team Members
        </span>
      }
      name="teamMembers"
      rules={[
        { required: true, message: "Please select at least one team member!" },
      ]}
      tooltip="Select one or more team members to assign to this project"
    >
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Please select your current mood."
        defaultValue={["happy"]}
        onChange={(value) => {
          console.log(`selected ${value}`);
        }}
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {`${option.data.label} (${option.data.desc})`}
          </Space>
        )}
      />
    </Form.Item>
  );
};

export default SelectManager;

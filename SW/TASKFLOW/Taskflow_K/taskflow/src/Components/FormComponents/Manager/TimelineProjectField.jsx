// ==================== Ant Deisgn  ====================

import { DatePicker } from "antd";
import Form from "antd/es/form/Form";
import { CalendarOutlined } from "@ant-design/icons";
// ==================== Constants  ====================

import { primaryColor } from "../../../Constants/Colors";

const { RangePicker } = DatePicker;

const TimelineProjectField = () => {
  return (
    <Form.Item
    
      label={
        <span>
          <CalendarOutlined
            style={{ marginRight: "8px", color: primaryColor }}
          />
          Project Timeline
        </span>
      }
      name="dateRange"
      rules={[
        {
          required: true,
          message: "Please select the project timeline!",
        },
      ]}
      tooltip="Select the start and end dates for your project"
    >
      <RangePicker
        style={{ width: "100%", borderRadius: "8px" }}
        placeholder={["Start Date", "End Date"]}
        format="YYYY-MM-DD"
        disabledDate={(current) => {
          return current && current < new Date().setHours(0, 0, 0, 0);
        }}
      />
    </Form.Item>
  );
};

export default TimelineProjectField;

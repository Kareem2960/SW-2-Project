import { useState } from "react";

// ==================== Ant Deisgn  ====================

import { Button, Card, message, Row, Col,  Typography } from "antd";
import Form from "antd/es/form/Form";
import { SendOutlined, ClearOutlined } from "@ant-design/icons";
// ==================== FormComponents  ====================
import SelectManager from "../../FormComponents/Manager/SelectManager";
import NameProjectField from "../../FormComponents/Manager/NameProjectField";
import DescProjectField from "../../FormComponents/Manager/DescPRojectField";
// ==================== Components  ====================

import ProjectModal from "../../Modals/ProjectModal";
import TimelineProjectField from "../../FormComponents/Manager/TimelineProjectField";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/http";

// ==================== Constants  ====================

import { red } from "../../../Constants/Colors";

const { Text } = Typography;

const ProjectForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Send Throght API

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      // Format the date range
      const formattedValues = {
        name: values.projectName,
      };

      console.log("Form values:", formattedValues);

      // Call backend API
      await api.post("/api/projects", formattedValues);

      message.success({
        content: "Project created successfully!",
        duration: 3,
      });
      form.resetFields();
      navigate("/manager/projects");
    } catch (err) {
      console.log(err);
      message.error({
        content: "Failed to create project. Please try again.",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    const errors = errorInfo.errorFields.map((field) => field.errors[0]);
    message.error({
      content: errors[0] || "Please fill in all required fields correctly.",
      duration: 3,
    });
  };

  const handleReset = () => {
    form.resetFields();
    message.info({
      content: "Form has been reset",
      duration: 2,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {open && <ProjectModal open={open} setOpen={setOpen} project={{}} />}

      <div data-aos="flip-left">
        <Card>
          <div
            className="flex w-full justify-end"
            style={{ marginBottom: "20px" }}
          >
            <Button onClick={setOpen}>Preview</Button>
          </div>

          {/* Form Section */}
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <NameProjectField />
            <DescProjectField />
            <TimelineProjectField />
            <SelectManager />

            <Form.Item             
>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    loading={loading}
                    block
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: 500,
                      fontSize: "clamp(14px, 4vw, 16px)", // Responsive font size
                    }}
                  >
                    {loading ? "Submitting..." : "Submit To Admin"}
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Button
                    htmlType="button"
                    onClick={handleReset}
                    icon={<ClearOutlined />}
                    block
                    style={{
                      height: "44px",
                      borderRadius: "8px",
                      borderColor: "#d9d9d9",
                      fontSize: "clamp(14px, 4vw, 16px)", // Responsive font size
                    }}
                  >
                    Reset Form
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>

          {/* Footer Note */}
          <div
            style={{
              marginTop: "clamp(24px, 6vw, 32px)", // Responsive margin
              paddingTop: "clamp(16px, 4vw, 24px)", // Responsive padding
              borderTop: "1px solid #f0f0f0",
              textAlign: "center",
            }}
          >
            <Text
              type="secondary"
              style={{ fontSize: "clamp(11px, 3vw, 13px)" }}
            >
              <span style={{ color: red }}>*</span> All fields are required. The
              project will be reviewed by an admin before approval.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectForm;

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Card,
  message,
  Checkbox,
  Radio,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useAuth } from "../../../Context/AuthContext";
import { useTheme } from "../../../Context/DarkModeProvider";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const SignUpForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { isDarkMode } = useTheme();

  const onFinish = async (values) => {
    setLoading(true);
    const result = await signup(values);

    if (result.success) {
      form.resetFields();
      if (onSuccess) {
        onSuccess(result);
      }
    }

    setLoading(false);
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Password is required"));
    }
    if (value.length < 6) {
      return Promise.reject(
        new Error("Password must be at least 6 characters"),
      );
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please confirm your password"));
    }
    if (value !== form.getFieldValue("password")) {
      return Promise.reject(new Error("Passwords do not match"));
    }
    return Promise.resolve();
  };

  const validateFirstName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("First name is required"));
    }
    if (value.trim().length < 2) {
      return Promise.reject(
        new Error("First name must be at least 2 characters"),
      );
    }
    return Promise.resolve();
  };

  const validateLastName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Last name is required"));
    }
    if (value.trim().length < 2) {
      return Promise.reject(
        new Error("Last name must be at least 2 characters"),
      );
    }
    return Promise.resolve();
  };

  const validateAge = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Age is required"));
    }
    if (value < 18) {
      return Promise.reject(new Error("You must be at least 18 years old"));
    }
    if (value > 120) {
      return Promise.reject(new Error("Please enter a valid age"));
    }
    return Promise.resolve();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isDarkMode ? "#111827" : "#fef3ed",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: isDarkMode ? "#0f172a" : "#ffffff",
          borderRadius: "32px",
          padding: "40px",
          boxShadow: isDarkMode
            ? "0 30px 90px rgba(0,0,0,0.35)"
            : "0 35px 90px rgba(239,111,75,0.18)",
          border: isDarkMode
            ? "1px solid #1e293b"
            : "1px solid rgba(239,111,75,0.18)",
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: "12px",
            color: "#dc5b43",
            fontWeight: "700",
          }}
        >
          Create Account
        </Title>
        <Paragraph
          style={{
            marginBottom: "32px",
            color: isDarkMode ? "#cbd5e1" : "#64748b",
            fontSize: "16px",
          }}
        >
          Join FlowMaster and start managing your projects with a modern team
          hub
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ validator: validateFirstName }]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                    />
                  }
                  placeholder="John"
                  size="large"
                  style={{
                    borderRadius: "16px",
                    background: isDarkMode ? "#0f172a" : "#ffffff",
                    borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                    color: isDarkMode ? "#e2e8f0" : "#0f172a",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ validator: validateLastName }]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                    />
                  }
                  placeholder="Doe"
                  size="large"
                  style={{
                    borderRadius: "16px",
                    background: isDarkMode ? "#0f172a" : "#ffffff",
                    borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                    color: isDarkMode ? "#e2e8f0" : "#0f172a",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ validator: validateAge }]}
          >
            <Input
              type="number"
              prefix={
                <UserOutlined
                  style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                />
              }
              placeholder="18+"
              size="large"
              style={{
                borderRadius: "16px",
                background: isDarkMode ? "#0f172a" : "#ffffff",
                borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                color: isDarkMode ? "#e2e8f0" : "#0f172a",
              }}
              min={18}
              max={120}
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Username is required" },
              {
                min: 3,
                message: "Username must be at least 3 characters",
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                />
              }
              placeholder="Enter a unique username"
              size="large"
              style={{
                borderRadius: "16px",
                background: isDarkMode ? "#0f172a" : "#ffffff",
                borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                color: isDarkMode ? "#e2e8f0" : "#0f172a",
              }}
            />
          </Form.Item>

          <Form.Item
            label="I want to sign up as"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
            initialValue="member"
          >
            <Radio.Group size="large" style={{ width: "100%" }}>
              <Radio.Button
                value="member"
                style={{
                  width: "50%",
                  textAlign: "center",
                  borderRadius: "16px 0 0 16px",
                }}
              >
                Team Member
              </Radio.Button>
              <Radio.Button
                value="manager"
                style={{
                  width: "50%",
                  textAlign: "center",
                  borderRadius: "0 16px 16px 0",
                }}
              >
                Project Manager
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                />
              }
              placeholder="Enter your password"
              size="large"
              style={{
                borderRadius: "16px",
                background: isDarkMode ? "#0f172a" : "#ffffff",
                borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                color: isDarkMode ? "#e2e8f0" : "#0f172a",
              }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ validator: validateConfirmPassword }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                />
              }
              placeholder="Confirm your password"
              size="large"
              style={{
                borderRadius: "16px",
                background: isDarkMode ? "#0f172a" : "#ffffff",
                borderColor: isDarkMode ? "#334155" : "#e2e8f0",
                color: isDarkMode ? "#e2e8f0" : "#0f172a",
              }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("You must accept the terms and conditions"),
                      ),
              },
            ]}
          >
            <Checkbox style={{ color: isDarkMode ? "#cbd5e1" : "#475569" }}>
              I agree to the{" "}
              <Link to="/terms" style={{ color: "#dc5b43" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" style={{ color: "#dc5b43" }}>
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: "24px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              icon={<UserOutlined />}
              style={{
                height: "52px",
                fontSize: "16px",
                fontWeight: "600",
                background: "linear-gradient(135deg, #ef6d4b 0%, #dc5b43 100%)",
                border: "none",
                borderRadius: "16px",
              }}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text style={{ color: isDarkMode ? "#cbd5e1" : "#64748b" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#dc5b43", fontWeight: "600" }}>
              Sign in here
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

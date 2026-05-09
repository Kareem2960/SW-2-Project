import React from "react";
import { Form, Input, Button, Typography, Row, Col, Card, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ThunderboltOutlined,
  SafetyOutlined,
  StarOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../Context/AuthContext";
import { useTheme } from "../../../Context/DarkModeProvider";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const LoginForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Show message from navigation state (e.g., from signup success)
  React.useEffect(() => {
    if (location.state?.message) {
      message.info(location.state.message);
      // Clear the state after showing the message
      window.history.replaceState(null, '');
    }
  }, [location.state]);

  const mutation = useMutation({
    mutationFn: (values) => login(values),
    onSuccess: (result) => {
      if (result.success) {
        form.resetFields();
        if (onSuccess) {
          onSuccess(result.user);
        }
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Username is required"));
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Password is required"));
    }
    if (value.length < 1) {
      return Promise.reject(new Error("Password is required"));
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
          maxWidth: "520px",
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
          Sign In
        </Title>
        <Paragraph
          style={{
            marginBottom: "32px",
            color: isDarkMode ? "#cbd5e1" : "#64748b",
            fontSize: "16px",
          }}
        >
          Welcome back to FlowMaster! Please enter your details
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ validator: validateEmail }]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{ color: isDarkMode ? "#94a3b8" : "#cbd5e1" }}
                />
              }
              placeholder="Enter your username"
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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                color: isDarkMode ? "#cbd5e1" : "#64748b",
                fontSize: "14px",
              }}
            >
              Remember me
            </span>
            <Link
              to=""
              style={{
                color: "#dc5b43",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Forgot password?
            </Link>
          </div>

          <Form.Item style={{ marginBottom: "24px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
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
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text style={{ color: isDarkMode ? "#cbd5e1" : "#64748b" }}>
            Don't have an account?{" "}
            <Link to="/sign-up" style={{ color: "#dc5b43", fontWeight: "600" }}>
              Create one now
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

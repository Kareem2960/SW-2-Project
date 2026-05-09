import { Card, Row, Col, Statistic, Typography } from "antd";
import { UserOutlined, TeamOutlined, CrownOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { api } from "../../../config/http";
import { primaryRole } from "../../../utils/userRole";

const PerformanceUsers = () => {
  const [stats, setStats] = useState({
    total: 0,
    managers: 0,
    members: 0,
    active: 0,
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { data } = await api.get("/api/admin/users");
        const users = Array.isArray(data) ? data : [];
        if (cancelled) return;
        const managers = users.filter((u) => primaryRole(u.roles) === "Manager").length;
        const members = users.filter((u) => primaryRole(u.roles) === "Member").length;
        const active = users.filter((u) => u.isApproved).length;
        setStats({
          total: users.length,
          managers,
          members,
          active,
        });
      } catch {
        if (!cancelled) setStats({ total: 0, managers: 0, members: 0, active: 0 });
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
            styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">Total Users</Typography.Text>
              }
              value={stats.total}
              prefix={
                <UserOutlined style={{ color: "#6366f1", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#6366f1",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
            styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">
                  Project Managers
                </Typography.Text>
              }
              value={stats.managers}
              prefix={
                <CrownOutlined style={{ color: "#f59e0b", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#f59e0b",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
            styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">Team Members</Typography.Text>
              }
              value={stats.members}
              prefix={
                <TeamOutlined style={{ color: "#10b981", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#10b981",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
            }}
            styles={{ body: { padding: "20px" } }}
          >
            <Statistic
              title={
                <Typography.Text type="secondary">Approved users</Typography.Text>
              }
              value={stats.active}
              prefix={
                <UserOutlined style={{ color: "#22c55e", fontSize: "20px" }} />
              }
              styles={{
                content: {
                  color: "#22c55e",
                  fontSize: "28px",
                  fontWeight: 600,
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceUsers;

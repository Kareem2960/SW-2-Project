import React from "react";
import { Card, Table, Tag, Typography, Button, theme } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import { api } from "../../config/http";
import { User, RefreshCw } from "lucide-react";
import { primaryRole } from "../../utils/userRole";

const { Title } = Typography;

const DashboardUsers = () => {
  const { isDarkMode } = useTheme();
  const { token } = theme.useToken();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/users");
      const rows = (response.data || []).map((u) => ({
        ...u,
        role: primaryRole(u.roles),
      }));
      setUsers(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "Admin" ? "red" : role === "Manager" ? "blue" : "green"}>
          {role}
        </Tag>
      ),
    },
    {
      title: "Approved",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved) => (
        <Tag color={isApproved ? "green" : "orange"}>
          {isApproved ? "Yes" : "No"}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "32px" }}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <User size={24} color="#3b82f6" />
            <Title level={4} style={{ margin: 0 }}>All Users in Database</Title>
            <Tag color="blue" style={{ marginLeft: "8px" }}>{users.length}</Tag>
            <Button
              icon={<RefreshCw size={16} />}
              onClick={fetchUsers}
              loading={loading}
              style={{ marginLeft: "auto" }}
            >
              Refresh
            </Button>
          </div>
        }
        style={{
          background: isDarkMode ? token.colorBgContainer : "white",
          borderColor: isDarkMode ? "#303030" : "#e5e7eb",
        }}
      >
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          style={{
            background: isDarkMode ? token.colorBgContainer : "white",
          }}
        />
      </Card>
    </div>
  );
};

export default DashboardUsers;

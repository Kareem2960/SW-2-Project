import { useState, useEffect } from "react";

// ==================== Ant Design   ====================

import { Table, Card, Input, Typography } from "antd";
import { Avatar, Button, Space, Tag } from "antd";

import {
  EyeOutlined,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";

// ==================== React-router-dom  ====================

import { Link } from "react-router-dom";

// ==================== Components  ====================

import TasksModal from "../../Modals/TasksModal";
import CommentsModal from "../../Modals/CommentsModal";
import DeleteMemberModal from "../../Modals/Manager/DeleteMemeberModal";
import { api } from "../../../config/http";

const { Title } = Typography;
const { Search } = Input;

const TeamTable = () => {
  const [openTasksModal, setOpenTasksModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/projects");
      const projects = response.data.map((project) => ({
        key: project.id,
        project_id: `PRJ-${String(project.id).padStart(3, '0')}`,
        project_name: project.name,
        id: project.id,
        manager_id: project.managerId,
        members: project.members || [],
        number_of_tasks: project.tasks?.length || 0,
        completed_tasks: project.tasks?.filter(t => t.status === 'Done').length || 0,
        tags: ["project"],
        status: "in-progress",
      }));
      setData(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Project ID",
      dataIndex: "project_id",
      key: "project_id",
      width: 100,
      render: (text) => <Tag color="blue">#{text}</Tag>,
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
      width: 200,
      sorter: true,
    },
    {
      title: "Manager ID",
      dataIndex: "manager_id",
      key: "manager_id",
      width: 120,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      width: 200,
      render: (members) => (
        <Space size="small" wrap>
          {members?.length > 0 ? (
            members.map((member) => (
              <Tag key={member.userId} color="green">
                {member.firstName} {member.lastName}
              </Tag>
            ))
          ) : (
            <Tag color="default">No members</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Tasks",
      dataIndex: "number_of_tasks",
      key: "number_of_tasks",
      width: 80,
      align: "center",
    },
    {
      title: "Completed",
      dataIndex: "completed_tasks",
      key: "completed_tasks",
      width: 100,
      align: "center",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: 150,
      render: (tags) => (
        <Space size="small" wrap>
          {tags?.map((tag) => (
            <Tag key={tag} color="geekblue">
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: 150,
      fixed: window.innerWidth >= 768 ? "right" : false,
      render: (record) => (
        <Space size="small">
          <Link to={`/manager/projects/${record.id}`}>
            <Button
              type="link"
              icon={<EyeOutlined />}
              size="small"
            >
              View
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // In View =  Will appear all tasks for this member can add , delete , edit task ,  show the status of the task , appproved or reject task , dowload the complete task and filally , Show the performace in this peoject for member

  return (
    <div>
      <TasksModal modalOpen={openTasksModal} setModalOpen={setOpenTasksModal} />
      <CommentsModal
        open={isCommentsModalOpen}
        setOpen={setIsCommentsModalOpen}
      />

      <DeleteMemberModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        memberName="John Doe"
        onConfirm={() => {
          // Handle delete logic here
          console.log("Member deleted");
        }}
      />
      <Card style={{ borderRadius: "12px" }}>
        <div
          style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Team Projects
          </Title>
          <Search placeholder="Search..." style={{ width: 250 }} />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Card>
    </div>
  );
};

export default TeamTable;

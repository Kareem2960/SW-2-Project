import { useState, useEffect, useCallback, useMemo } from "react";

// ==================== React-router-dom ====================

import { Link, useParams, useNavigate } from "react-router-dom";

// ==================== Ant Design ====================

import {
  Flex,
  message,
  Tag,
  Typography,
  Form,
  Card,
  Button,
  Space,
} from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

// ==================== Components ====================

import BackBtn from "../../Components/Buttons/BackBtn";
import TaskModal from "../../Components/Modals/TaskModal";
import DeleteProjectModal from "../../Components/Modals/DeleteProjectModal";
import ProjectTabs from "../../Components/Tabs/Project/ProjectTabs";
import PerformaceProject from "../../Components/Analytics/Project/PerformaceProject";
import { api, getApiErrorMessage } from "../../config/http";

const { Title, Text } = Typography;

const ManageProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [members, setMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchProjectData = useCallback(async () => {
    try {
      const response = await api.get(`/api/projects/${projectId}`);
      setProjectData(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
      messageApi.error("Failed to fetch project data");
    }
  }, [projectId, messageApi]);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/api/auth/members");
      const users = Array.isArray(response.data) ? response.data : [];
      const memberOptions = users.map((user) => ({
        value: user.userId,
        label: `${user.firstName} ${user.lastName} (${user.userName})`,
      }));
      setAllMembers(users);
      setMembers(memberOptions);
    } catch (error) {
      console.error("Error fetching members:", error);
      messageApi.error(getApiErrorMessage(error, "Failed to fetch members"));
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProjectData();
      await fetchMembers();
    };
    loadData();
  }, [fetchProjectData]);

  const projectMembers = useMemo(() => {
    const memberRefs = projectData?.members ?? [];
    if (!memberRefs.length || !allMembers.length) {
      return [];
    }

    const byUserId = new Map(allMembers.map((u) => [u.userId, u]));
    return memberRefs
      .map((memberRef) => byUserId.get(memberRef.userId))
      .filter(Boolean);
  }, [projectData, allMembers]);

  const handleSaveTask = async () => {
    try {
      const values = await form.validateFields();
      const pid = Number.parseInt(projectId, 10);
      const createBody = {
        title: values.title,
        description: values.description,
        status: values.status ?? "ToDo",
        priority: values.priority,
        dueDate: values.dueDate
          ? new Date(values.dueDate.valueOf?.() ?? values.dueDate).toISOString()
          : null,
        projectId: pid,
      };

      const { data: created } = await api.post("/api/tasks", createBody);
      if (values.assignedTo != null && created?.id != null) {
        await api.post(`/api/tasks/${created.id}/assign`, {
          userId: values.assignedTo,
        });
      }
      messageApi.success("Task added successfully");
      setIsTaskModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error creating task:", error);
      messageApi.error("Failed to create task");
    }
  };

  const handleAddTask = () => {
    form.resetFields();
    setIsTaskModalOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", paddingInline: 0 }}>
      {contextHolder}
      {/* Modals */}
      <TaskModal
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        task={{}}
        handleSaveTask={handleSaveTask}
        form={form}
        members={members}
      />
      <DeleteProjectModal
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        projectName={projectData?.name || "Project"}
        onConfirm={async () => {
          try {
            await api.delete(`/api/projects/${projectId}`);
            messageApi.success("Project deleted successfully");
            navigate("/manager/projects");
          } catch (error) {
            console.error("Error deleting project:", error);
            messageApi.error("Failed to delete project");
          }
        }}
      />
      {/* Header Section */}
      <Card style={{ marginBottom: "24px", borderRadius: "12px" }}>
        <Flex justify="space-between" align="start" wrap="wrap" gap="16px">
          <Space orientation="vertical" size="8px" style={{ width: "100%" }}>
            <Flex justify="end" >
              <BackBtn />
            </Flex>

            <Title level={2} style={{ margin: "16px 0 8px 0" }}>
              {projectData?.name || "Loading..."}
            </Title>
            <Text
              type="secondary"
              style={{ maxWidth: "600px", display: "block" }}
            >
              {projectData?.name || "Loading..."}
            </Text>
          </Space>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTask}
              size="large"
              style={{ borderRadius: "8px", fontWeight: "600" }}
            >
              Add New Task
            </Button>

            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Project
            </Button>
          </div>
        </Flex>
      </Card>

      {/* Team Members Section */}
      <Card style={{ marginBottom: "24px", borderRadius: "12px" }}>
        <Title level={4} style={{ marginBottom: "16px" }}>Team</Title>
        <Space size="small" wrap>
          {projectMembers.length > 0 ? (
            projectMembers.map((member) => (
              <Tag key={member.userId} color="green" style={{ fontSize: "14px", padding: "4px 12px" }}>
                {member.firstName} {member.lastName} ({member.userName})
              </Tag>
            ))
          ) : (
            <Text type="secondary">No team members assigned</Text>
          )}
        </Space>
      </Card>

      <PerformaceProject />
      {/* Tabs Section */}
      <Button
        type="primary"
        ghost
        icon={<UnorderedListOutlined />}
        style={{ borderRadius: "6px", marginBottom: "1rem" }}
      >
        <Link to="tasks">Show All Tasks</Link>
      </Button>{" "}
      <Card style={{ borderRadius: "12px", padding: "0 !important" }}>
        <ProjectTabs projectId={projectId} />
      </Card>
    </div>
  );
};

export default ManageProject;

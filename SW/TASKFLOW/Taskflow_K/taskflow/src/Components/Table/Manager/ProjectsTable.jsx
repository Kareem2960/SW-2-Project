// ==================== Ant Design   ====================

import { Table } from "antd";
import { Avatar, Button, Space, Tag } from "antd";

import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

// ==================== React-router-dom  ====================

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteProjectModal from "../../Modals/DeleteProjectModal";
import { api } from "../../../config/http";

// ==================== Components  ====================

const ProjectsTable = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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
        key: project.id.toString(),
        project_id: `PRJ-${String(project.id).padStart(3, '0')}`,
        project_name: project.name,
        team_members: project.members || [],
        number_of_tasks: project.tasks?.length || 0,
        completed_tasks: project.tasks?.filter(t => t.status === 'Done').length || 0,
        status: "active",
      }));
      setData(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/api/projects/${selectedProject.key}`);
      setIsDeleteModalOpen(false);
      fetchProjects(); // Refresh the projects list
    } catch (error) {
      console.error("Error deleting project:", error);
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
      width: 150,
      sorter: true,
    },
    {
      title: "Team Members",
      dataIndex: "team_members",
      key: "team_members",
      width: 200,
      render: (members) => (
        <span style={{ fontSize: "12px" }}>
          {members?.length > 0 
            ? members.map(m => `${m.firstName} ${m.lastName}`).join(", ")
            : "No members"
          }
        </span>
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
      title: "Actions",
      key: "action",
      width: 150,
      fixed: window.innerWidth >= 768 ? "right" : false,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/manager/projects/${record.key}`)}
          >
            View details
          </Button>

          <Button
            type="link"
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {isDeleteModalOpen && (
        <DeleteProjectModal
          open={isDeleteModalOpen}
          setOpen={setIsDeleteModalOpen}
          projectName={selectedProject?.project_name}
          projectId={selectedProject?.project_id}
          onConfirm={handleDeleteConfirm}
        />
      )}
      <div data-aos="zoom-in">
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
      </div>
    </div>
  );
};

export default ProjectsTable;

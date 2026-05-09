// In View = Will appear all tasks for this member can add, delete, edit task,
// show the status of the task, approved or reject task, download the complete task and finally,
// Show the performance in this project for member

// ==================== Ant Design ====================

import { useState } from "react";
import { Modal, Table, Button, Space, Tag, message, Form, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
// ==================== Components ====================

import TaskModal from "./TaskModal";
import PerformanceTasksPerMember from "../Analytics/Task/PerformanceTasksPerMember";
// ==================== Functions ====================
import { GetStatusText } from "../../Functions/Tasks/GetStatusText";
import getStatusColor from "../../Functions/Tasks/GetStatusColor.jsx";

// ==================== Constants ====================

import { green } from "../../Constants/Colors";
import AddNewTaskBtn from "../Buttons/Task/AddNewTaskBtn.jsx";
import DownloadTaskBtn from "../Buttons/Task/DownloadTaskBtn.jsx";
import DeleteTaskBtn from "../Buttons/Task/DeleteTaskBtn.jsx";
import EditTaskBtn from "../Buttons/Task/EditTaskBtn.jsx";

const TasksModal = ({ modalOpen, setModalOpen, memberName = "Malak", projectName="Front end" }) => {
  const [messageApi, contextHolder] = message.useMessage();

  //  memberName, projectName = Will replace wiith member obj from API

  // Update When the task is completed I can Approve or not !!! Not in another status
  // ============ STATIC VALUES - Replace with API data later ============
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Sample Task 1",
      description: "Task description here",
      status: "pending", // pending, in-progress, completed, rejected
      approved: false,
      createdAt: "2024-01-01",
      dueDate: "2024-01-15",
      completedAt: null,
      priority: 0,
    },
    {
      id: 2,
      title: "Sample Task 2",
      description: "Task description here",
      status: "in-progress",
      approved: false,
      createdAt: "2024-01-01",
      dueDate: "2024-01-20",
      completedAt: null,
      priority: 0,
    },
    {
      id: 3,
      title: "Sample Task 3",
      description: "Task description here",
      status: "completed",
      approved: false,
      createdAt: "2024-01-01",
      dueDate: "2024-01-20",
      completedAt: null,
      priority: 0,
    },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [form] = Form.useForm();

  // ============ CRUD OPERATIONS ============
  const handleAddTask = () => {
    setEditingTask(null);
    form.resetFields();
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: dayjs(task.dueDate),
      priority: task.priority,
    });
    setIsTaskModalOpen(true);
    console.log(task);
  };

  // Will split later
  const handleSaveTask = () => {
    form.validateFields().then((values) => {
      if (editingTask) {
        // Edit existing task
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id
              ? {
                  ...task,
                  title: values.title,
                  description: values.description,
                  dueDate: values.dueDate.format("YYYY-MM-DD"),
                  priority: values.priority,
                }
              : task,
          ),
        );
        messageApi.success("Task updated successfully");
      } else {
        // Add new task
        const newTask = {
          id: Date.now(),
          title: values.title,
          description: values.description,
          status: "pending",
          approved: false,
          createdAt: dayjs().format("YYYY-MM-DD"),
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          completedAt: null,
          priority: values.priority,
        };
        setTasks([...tasks, newTask]);
        messageApi.success("Task added successfully");
      }
      setIsTaskModalOpen(false);
      form.resetFields();
    });
  };

  const handleApproveTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              approved: true,
              status: "completed",
              completedAt: dayjs().format("YYYY-MM-DD"),
            }
          : task,
      ),
    );
    messageApi.success("Task approved successfully");
  };

  const handleRejectTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, approved: false, status: "Try again" }
          : task,
      ),
    );
    messageApi.error("Task rejected");
  };

  // ============ TABLE COLUMNS ============
  const columns = [
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 250,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag
          color={getStatusColor(status).status}
          icon={getStatusColor(status).icon}
        >
          {GetStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Approval",
      dataIndex: "approved",
      key: "approved",
      width: 120,
      render: (approved, record) => (
        <Space>
          {record.status === "completed" && !approved && (
            <>
              <Tooltip title="Approve Task">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  size="small"
                  onClick={() => handleApproveTask(record.id)}
                  style={{ backgroundColor: green }}
                />
              </Tooltip>
              <Tooltip title="Reject Task">
                <Button
                  danger
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => handleRejectTask(record.id)}
                />
              </Tooltip>
            </>
          )}
          {approved && <Tag color="success">Approved ✓</Tag>}
          {!approved && record.status === "rejected" && (
            <Tag color="error">Rejected ✗</Tag>
          )}
          {record.status !== "completed" && !approved && (
            <Tag color="default">Pending Approval</Tag>
          )}
          {record.status === "completed" && !approved && approved && (
            <Tag color="warning">Waiting Approval</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 110,
    },
    {
      title: "priority",
      dataIndex: "priority",
      key: "priority",
      width: 80,
      render: (priority) => <Tag color="blue">{priority} pts</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <EditTaskBtn record={record} handleEditTask={handleEditTask} />
          </Tooltip>
          <DeleteTaskBtn id={record.id} />
          <Tooltip title="Download">
            <DownloadTaskBtn record={record} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <Modal
        title={`Tasks Management - ${memberName || "Member"} (${projectName || "Project"})`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {/* Performance Section */}

        {/* Will Send the Member ID To take the performace */}
        <PerformanceTasksPerMember />

        {/* Add Task Button */}
        <AddNewTaskBtn handleAddTask={handleAddTask} />

        {/* Tasks Table */}
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 1000 }}
        />
      </Modal>

      {/* Add/Edit Task Modal */}

      <TaskModal
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        task={editingTask !== null ? editingTask : {}}
        handleSaveTask={handleSaveTask}
        form={form}
      />
    </>
  );
};

export default TasksModal;

import React, { useState } from "react";
// ==================== Ant Design ====================
import dayjs from "dayjs";

import {
  Card,
  Input,
  Avatar,
  Button,
  Space,
  Typography,
  Tag,
  Flex,
  Empty,
  Form,
  message,
  Grid,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
// ==================== Constants ====================

import { primaryColor } from "../../../Constants/Colors";
// ==================== Compoennets ====================

import DeleteTaskBtn from "../../Buttons/Task/DeleteTaskBtn";
import EditTaskBtn from "../../Buttons/Task/EditTaskBtn";
import TaskModal from "../../Modals/TaskModal";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const TasksTab = () => {
  const screens = useBreakpoint();
  const [searchText, setSearchText] = useState("");
  const [tasks, _] = useState([
    {
      id: 1,
      name: "Design Database Schema",
      assignedTo: "Malak",
      avatar: "M",
      role: "Developer",
    },
    {
      id: 2,
      name: "Create API Endpoints",
      assignedTo: "Rawan",
      avatar: "R",
      role: "Backend",
    },
    {
      id: 3,
      name: "Build UI Components",
      assignedTo: "Ahmed",
      avatar: "A",
      role: "Frontend",
    },
    {
      id: 4,
      name: "Write Documentation",
      assignedTo: "Sara",
      avatar: "S",
      role: "Writer",
    },
  ]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchText.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchText.toLowerCase()),
  );

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const handleEditTask = (task) => {
    //   setEditingTask(task);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: dayjs(task.dueDate),
      priority: task.priority,
    });
    setIsTaskModalOpen(true);
    console.log(task);
  };
  const handleSaveTask = () => {
    form.validateFields().then((values) => {
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
      console.log(newTask);
      messageApi.success("Task added successfully");
      setIsTaskModalOpen(false);
      form.resetFields();
    });
  };

  return (
    <div style={{ padding: screens.xs ? "8px" : "4px" }}>
      {contextHolder}
      {isTaskModalOpen && (
        <TaskModal
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          task={{
            id: "1",
            title: "Malak",
            description: "Hassan",
            status: "pending",
            approved: false,
            createdAt: dayjs().format("YYYY-MM-DD"),
            dueDate: "",
            completedAt: null,
            priority: 1,
          }}
          handleSaveTask={handleSaveTask}
          form={form}
        />
      )}
      {/* Search Bar Area */}
      <Flex
        justify={screens.xs ? "flex-start" : "space-between"}
        align="center"
        style={{ marginBottom: 24 }}
        gap="middle"
        wrap="wrap"
      >
        <Input
          placeholder="Filter tasks..."
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          allowClear
          size="large"
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            maxWidth: screens.xs ? "100%" : 320,
            width: screens.xs ? "100%" : "auto",
            borderRadius: "20px",
            border: "none",
          }}
        />

        <Space size="middle" wrap>
          <Button icon={<FilterOutlined />}>Filters</Button>
          <Button icon={<SortAscendingOutlined />}>Sort</Button>
        </Space>
      </Flex>

      {/* Task Container */}
      <Flex vertical gap="middle">
        {filteredTasks.length === 0 ? (
          <Card style={{ borderRadius: "12px" }}>
            <Empty description="No tasks found matching your search" />
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              hoverable
              styles={{
                body: { padding: screens.xs ? "12px 16px" : "16px 24px" },
              }}
              style={{ borderRadius: "12px" }}
            >
              <Flex
                justify="space-between"
                align={screens.xs ? "flex-start" : "center"}
                wrap="wrap"
                gap="middle"
              >
                {/* Left: Task Info */}
                <Flex
                  align={screens.xs ? "flex-start" : "center"}
                  gap={screens.xs ? "small" : "large"}
                  style={{ flex: 1 }}
                  wrap="wrap"
                  vertical={screens.xs}
                >
                  <div style={{ minWidth: screens.xs ? "100%" : "200px" }}>
                    <Text
                      strong
                      style={{
                        fontSize: screens.xs ? "14px" : "16px",
                        display: "block",
                      }}
                    >
                      {task.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                      Task ID: #{task.id}
                    </Text>
                  </div>

                  {/* Middle: Assignee */}
                  <Flex align="center" gap="small" wrap="wrap">
                    <Avatar
                      size="small"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {task.avatar}
                    </Avatar>
                    <Text style={{ fontWeight: 500 }}>{task.assignedTo}</Text>
                    <Tag color="blue" variant="filled">
                      {task.role}
                    </Tag>
                  </Flex>
                </Flex>

                {/* Right: Actions */}
                <Space size="middle" wrap>
                  <EditTaskBtn handleEditTask={handleEditTask} record={task} />

                  <DeleteTaskBtn id={task.id} />
                </Space>
              </Flex>
            </Card>
          ))
        )}
      </Flex>
    </div>
  );
};

export default TasksTab;

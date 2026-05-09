import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Button, Card, Typography, Select, App } from "antd";
import { SendOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { api, getApiErrorMessage } from "../../config/http";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CreateProject = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/api/auth/members");
      console.log("All members:", response.data);
      const memberOptions = response.data
        .map(user => ({
          value: user.userId,
          label: `${user.firstName} ${user.lastName} (${user.userName})`
        }));
      console.log("Filtered members:", memberOptions);
      setMembers(memberOptions);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        name: values.name,
      };

      console.log("Creating project with data:", formattedValues);

      const projectResponse = await api.post("/api/projects", formattedValues);
      console.log("Project created response:", projectResponse.data);
      const projectId = projectResponse.data?.id ?? projectResponse.data?.projectId;

      if (!projectId) {
        throw new Error("Project created but no project id returned by API");
      }

      // Add project members if any
      if (values.projectMembers && values.projectMembers.length > 0) {
        for (const memberId of values.projectMembers) {
          await api.post(`/api/projects/${projectId}/members`, {
            userId: memberId,
          });
        }
      }

      // Create tasks if any
      if (values.tasks && values.tasks.length > 0) {
        for (const task of values.tasks) {
          const taskData = {
            title: task.title,
            description: task.description,
            projectId,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate.toISOString() : null,
            status: task.status,
          };
          const createdTaskResponse = await api.post("/api/tasks", taskData);
          const createdTaskId =
            createdTaskResponse.data?.id ?? createdTaskResponse.data?.taskId;
          if (createdTaskId && task.assignedTo) {
            await api.post(`/api/tasks/${createdTaskId}/assign`, {
              userId: task.assignedTo,
            });
          }
        }
      }

      message.success("Project created successfully!");
      form.resetFields();
      navigate("/manager/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      message.error(
        getApiErrorMessage(error, "Failed to create project. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>Create New Project</Title>
        <Text type="secondary">Fill in the details below to create a new project</Text>
      </div>

      <Card style={{ maxWidth: "800px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: "",
            tasks: [],
          }}
        >
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input placeholder="Enter project name" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>

          <Form.Item
            name="deadline"
            label="Deadline"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="projectMembers"
            label="Project Members"
            rules={[{ required: true, message: "Please select project members" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select members for this project"
              options={members}
              style={{ width: "100%" }}
              loading={members.length === 0}
            />
          </Form.Item>

          <Title level={4} style={{ marginTop: "24px" }}>Initial Tasks</Title>
          <Form.List name="tasks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    style={{ marginBottom: "16px", backgroundColor: "#fafafa" }}
                    extra={
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{ color: "red" }}
                      />
                    }
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      label="Title"
                      rules={[{ required: true, message: "Please enter task title" }]}
                    >
                      <Input placeholder="Task title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Description"
                    >
                      <TextArea rows={2} placeholder="Task description" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "assignedTo"]}
                      label="Assigned Member"
                      rules={[{ required: true, message: "Please select a member" }]}
                    >
                      <Select placeholder="Select a member" options={members} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "priority"]}
                      label="Priority"
                      rules={[{ required: true, message: "Please select priority" }]}
                    >
                      <Select placeholder="Select priority">
                        <Select.Option value="Low">Low</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="High">High</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "dueDate"]}
                      label="Due Date"
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "status"]}
                      label="Status"
                      rules={[{ required: true, message: "Please select status" }]}
                    >
                      <Select placeholder="Select status">
                        <Select.Option value="ToDo">To Do</Select.Option>
                        <Select.Option value="InProgress">In Progress</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                      </Select>
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Task
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={loading}
              size="large"
              block
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProject;

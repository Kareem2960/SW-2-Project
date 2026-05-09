import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, message } from 'antd';
import dayjs from 'dayjs';
import { taskService } from '../../services/taskService';

const { TextArea } = Input;
const { Option } = Select;

const TaskForm = ({ task = null, onSubmit, onCancel, projectId = null }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedToId: task.assignedTo?.id,
        projectId: task.projectId || projectId,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      });
    } else {
      form.setFieldsValue({
        projectId: projectId,
        status: 'TODO',
        priority: 'MEDIUM',
      });
    }
    // Fetch users for assignment dropdown
    fetchUsers();
  }, [task, form, projectId]);

  const fetchUsers = async () => {
    try {
      // This would typically call a user service to get available users
      // For now, we'll use a mock list
      const mockUsers = [
        { id: 1, username: 'admin', email: 'admin@example.com' },
        { id: 2, username: 'manager', email: 'manager@example.com' },
        { id: 3, username: 'member1', email: 'member1@example.com' },
        { id: 4, username: 'member2', email: 'member2@example.com' },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const taskData = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      };

      if (task) {
        // Update existing task
        await taskService.updateTask(task.id, taskData);
      } else {
        // Create new task
        await taskService.createTask(taskData);
      }
      
      onSubmit();
    } catch (error) {
      message.error('Failed to save task: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        status: 'TODO',
        priority: 'MEDIUM',
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: 'Please enter task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter task description' }]}
          >
            <TextArea
              rows={4}
              placeholder="Enter task description"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select placeholder="Select priority">
              <Option value="LOW">Low</Option>
              <Option value="MEDIUM">Medium</Option>
              <Option value="HIGH">High</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="TODO">To Do</Option>
              <Option value="IN_PROGRESS">In Progress</Option>
              <Option value="IN_REVIEW">In Review</Option>
              <Option value="DONE">Done</Option>
              <Option value="BLOCKED">Blocked</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="dueDate"
            label="Due Date"
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Select due date"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="assignedToId"
            label="Assign To"
          >
            <Select placeholder="Select user to assign" allowClear>
              {users.map(user => (
                <Option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="projectId"
            label="Project"
            rules={[{ required: true, message: 'Please select project' }]}
          >
            <Select placeholder="Select project" disabled={!!projectId}>
              <Option value={projectId}>Current Project</Option>
              {/* Add more projects as needed */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: 8 }}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
        <Button onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;

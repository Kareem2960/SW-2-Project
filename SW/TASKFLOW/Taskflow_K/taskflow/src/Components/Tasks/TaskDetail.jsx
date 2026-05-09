import React, { useState } from 'react';
import { Descriptions, Tag, Button, Space, Card, Modal, message, Divider } from 'antd';
import { EditOutlined, UserOutlined, CalendarOutlined, FlagOutlined } from '@ant-design/icons';
import { taskService } from '../../services/taskService';
import TaskForm from './TaskForm';
import { GetStatusText } from '../../Functions/Tasks/GetStatusText';

const TaskDetail = ({ task }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!task) {
    return <div>No task selected</div>;
  }

  const handleEditTask = () => {
    setIsEditModalVisible(true);
  };

  const handleTaskUpdated = () => {
    setIsEditModalVisible(false);
    message.success('Task updated successfully');
    // You might want to refresh the task data here
  };

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      await taskService.updateTaskStatus(task.id, newStatus);
      message.success('Task status updated successfully');
      // You might want to refresh the task data here
    } catch (error) {
      message.error('Failed to update task status: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'TODO': 'default',
      'IN_PROGRESS': 'processing',
      'IN_REVIEW': 'warning',
      'DONE': 'success',
      'BLOCKED': 'error',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'LOW': 'blue',
      'MEDIUM': 'orange',
      'HIGH': 'red',
    };
    return colors[priority] || 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Card
        title={
          <Space>
            <span>{task.title}</span>
            <Tag color={getStatusColor(task.status)}>
              {GetStatusText(task.status)}
            </Tag>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEditTask}
          >
            Edit Task
          </Button>
        }
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Description" span={2}>
            {task.description || 'No description provided'}
          </Descriptions.Item>

          <Descriptions.Item label="Priority">
            <Tag color={getPriorityColor(task.priority)} icon={<FlagOutlined />}>
              {task.priority}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={getStatusColor(task.status)}>
              {GetStatusText(task.status)}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Assigned To">
            <Space>
              <UserOutlined />
              {task.assignedTo ? (
                <span>
                  {task.assignedTo.username}
                  {task.assignedTo.email && ` (${task.assignedTo.email})`}
                </span>
              ) : (
                <span style={{ color: '#999' }}>Unassigned</span>
              )}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Created By">
            <Space>
              <UserOutlined />
              {task.createdBy ? (
                <span>
                  {task.createdBy.username}
                  {task.createdBy.email && ` (${task.createdBy.email})`}
                </span>
              ) : (
                <span style={{ color: '#999' }}>Unknown</span>
              )}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Due Date">
            <Space>
              <CalendarOutlined />
              {formatDate(task.dueDate)}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Created Date">
            {formatDate(task.createdAt)}
          </Descriptions.Item>

          <Descriptions.Item label="Last Updated">
            {formatDate(task.updatedAt)}
          </Descriptions.Item>

          <Descriptions.Item label="Project ID">
            {task.projectId || 'Not assigned'}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* Quick Status Actions */}
        <Card title="Quick Actions" size="small">
          <Space wrap>
            {task.status !== 'TODO' && (
              <Button
                size="small"
                onClick={() => handleStatusUpdate('TODO')}
                loading={loading}
              >
                Mark as To Do
              </Button>
            )}
            {task.status !== 'IN_PROGRESS' && (
              <Button
                size="small"
                type="primary"
                onClick={() => handleStatusUpdate('IN_PROGRESS')}
                loading={loading}
              >
                Start Progress
              </Button>
            )}
            {task.status !== 'IN_REVIEW' && task.status !== 'TODO' && (
              <Button
                size="small"
                onClick={() => handleStatusUpdate('IN_REVIEW')}
                loading={loading}
              >
                Submit for Review
              </Button>
            )}
            {task.status !== 'DONE' && (
              <Button
                size="small"
                type="primary"
                ghost
                onClick={() => handleStatusUpdate('DONE')}
                loading={loading}
              >
                Mark as Done
              </Button>
            )}
            {task.status !== 'BLOCKED' && (
              <Button
                size="small"
                danger
                onClick={() => handleStatusUpdate('BLOCKED')}
                loading={loading}
              >
                Mark as Blocked
              </Button>
            )}
          </Space>
        </Card>
      </Card>

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <TaskForm
          task={task}
          onSubmit={handleTaskUpdated}
          onCancel={() => setIsEditModalVisible(false)}
        />
      </Modal>
    </>
  );
};

export default TaskDetail;

import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Tag, Modal, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { taskService } from '../../services/taskService';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetail';
import { GetStatusText } from '../../Functions/Tasks/GetStatusText';

const TaskList = ({ projectId = null, showMyTasks = false, filterStatus = null }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [projectId, showMyTasks, filterStatus]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      let data;
      if (showMyTasks) {
        data = await taskService.getMyTasks();
      } else if (projectId) {
        data = await taskService.getTasksByProject(projectId);
      } else {
        data = await taskService.getAllTasks();
      }
      
      // Apply status filter if provided
      if (filterStatus) {
        data = data.filter(task => task.status === filterStatus);
      }
      
      setTasks(data);
    } catch (error) {
      message.error('Failed to fetch tasks: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsCreateModalVisible(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalVisible(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsDetailModalVisible(true);
  };

  const handleDeleteTask = async (taskId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await taskService.deleteTask(taskId);
          message.success('Task deleted successfully');
          fetchTasks();
        } catch (error) {
          message.error('Failed to delete task: ' + error.message);
        }
      },
    });
  };

  const handleTaskCreated = () => {
    setIsCreateModalVisible(false);
    fetchTasks();
    message.success('Task created successfully');
  };

  const handleTaskUpdated = () => {
    setIsEditModalVisible(false);
    fetchTasks();
    message.success('Task updated successfully');
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {GetStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priority === 'HIGH' ? 'red' : priority === 'MEDIUM' ? 'orange' : 'blue'}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: ['assignedTo', 'username'],
      key: 'assignedTo',
      render: (username) => username || 'Unassigned',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewTask(record)}
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditTask(record)}
            title="Edit Task"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(record.id)}
            title="Delete Task"
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={showMyTasks ? 'My Tasks' : projectId ? `Project Tasks` : 'All Tasks'}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateTask}
        >
          Create Task
        </Button>
      }
    >
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tasks`,
          }}
        />
      </Spin>

      {/* Create Task Modal */}
      <Modal
        title="Create New Task"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={800}
      >
        <TaskForm
          onSubmit={handleTaskCreated}
          onCancel={() => setIsCreateModalVisible(false)}
          projectId={projectId}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <TaskForm
          task={selectedTask}
          onSubmit={handleTaskUpdated}
          onCancel={() => setIsEditModalVisible(false)}
          projectId={projectId}
        />
      </Modal>

      {/* Task Detail Modal */}
      <Modal
        title="Task Details"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <TaskDetail task={selectedTask} />
      </Modal>
    </Card>
  );
};

export default TaskList;

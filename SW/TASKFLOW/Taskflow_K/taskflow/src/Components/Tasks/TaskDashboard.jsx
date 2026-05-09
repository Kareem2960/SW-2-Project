import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Tabs, Spin } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined,
  UserOutlined 
} from '@ant-design/icons';
import TaskList from './TaskList';
import { taskService } from '../../services/taskService';

const { TabPane } = Tabs;

const TaskDashboard = ({ projectId = null }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    blocked: 0,
    overdue: 0,
  });

  useEffect(() => {
    fetchTasksAndStats();
  }, [projectId]);

  const fetchTasksAndStats = async () => {
    setLoading(true);
    try {
      let data;
      if (projectId) {
        data = await taskService.getTasksByProject(projectId);
      } else {
        data = await taskService.getAllTasks();
      }
      setTasks(data);
      calculateStats(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (taskData) => {
    const now = new Date();
    const stats = {
      total: taskData.length,
      todo: taskData.filter(t => t.status === 'TODO').length,
      inProgress: taskData.filter(t => t.status === 'IN_PROGRESS').length,
      done: taskData.filter(t => t.status === 'DONE').length,
      blocked: taskData.filter(t => t.status === 'BLOCKED').length,
      overdue: taskData.filter(t => {
        if (!t.dueDate || t.status === 'DONE') return false;
        return new Date(t.dueDate) < now;
      }).length,
    };
    setStats(stats);
  };

  const handleRefresh = () => {
    fetchTasksAndStats();
  };

  if (loading && tasks.length === 0) {
    return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: '50px' }} />;
  }

  return (
    <div>
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={stats.total}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="To Do"
              value={stats.todo}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={stats.inProgress}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed"
              value={stats.done}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Blocked"
              value={stats.blocked}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={stats.overdue}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff7875' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Completion Rate"
              value={stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Task Lists */}
      <Card>
        <Tabs defaultActiveKey="all">
          <TabPane tab="All Tasks" key="all">
            <TaskList projectId={projectId} />
          </TabPane>
          <TabPane tab="My Tasks" key="my">
            <TaskList showMyTasks={true} />
          </TabPane>
          <TabPane tab="To Do" key="todo">
            <TaskList 
              projectId={projectId}
              filterStatus="TODO"
            />
          </TabPane>
          <TabPane tab="In Progress" key="inProgress">
            <TaskList 
              projectId={projectId}
              filterStatus="IN_PROGRESS"
            />
          </TabPane>
          <TabPane tab="Completed" key="done">
            <TaskList 
              projectId={projectId}
              filterStatus="DONE"
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TaskDashboard;

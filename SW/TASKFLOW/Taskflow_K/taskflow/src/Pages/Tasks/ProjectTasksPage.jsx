import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { useParams } from 'react-router-dom';
import TaskDashboard from '../../Components/Tasks/TaskDashboard';

const { Content } = Layout;

const ProjectTasksPage = () => {
  const { projectId } = useParams();

  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Project {projectId}</Breadcrumb.Item>
        <Breadcrumb.Item>Tasks</Breadcrumb.Item>
      </Breadcrumb>
      
      <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
        <TaskDashboard projectId={parseInt(projectId)} />
      </div>
    </Content>
  );
};

export default ProjectTasksPage;

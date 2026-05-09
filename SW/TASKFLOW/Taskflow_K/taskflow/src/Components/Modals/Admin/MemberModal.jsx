import React from 'react';
import { Modal, Typography, Tag, Space, Avatar, Divider, List, Badge, Row, Col, theme } from 'antd';
import {
  UserOutlined, MailOutlined, PhoneOutlined, ProjectOutlined,
  TeamOutlined, CalendarOutlined, CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const MemberModal = ({ viewModalOpen, setViewModalOpen, selectedMember }) => {
  const { token } = theme.useToken();
  
  if (!selectedMember) return null;

  const memberProjects = selectedMember.projects || [];

  return (
    <Modal
      open={viewModalOpen}
      onCancel={() => setViewModalOpen(false)}
      footer={null}
      width={700}
      centered
      style={{ maxWidth: '95vw' }} 
      title={
        <Space>
          <UserOutlined style={{ color: token.colorPrimary }} />
          <span style={{ fontWeight: 600 }}>Member Profile</span>
        </Space>
      }
    >
      <div style={{ paddingTop: '16px' }}>
        
        {/* Header Section: Responsive Row */}
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <Avatar 
              size={{ xs: 80, sm: 100, md: 110 }} // حجم بيتغير حسب الشاشة
              style={{ backgroundColor: selectedMember.avatarColor || token.colorPrimary }}
            >
              {selectedMember.name?.charAt(0)}
            </Avatar>
          </Col>
          <Col xs={24} sm={18}>
            <div style={{ textAlign: 'center', }}>
              <Title level={3} style={{ margin: 0 }}>{selectedMember.name}</Title>
              <Space wrap style={{ marginTop: 8 }}>
                <Tag color="blue" icon={<TeamOutlined />}>{selectedMember.role || 'Member'}</Tag>
                <Badge 
                  status={selectedMember.status === 'active' ? 'success' : 'warning'} 
                  text={selectedMember.status === 'active' ? 'Active' : 'Inactive'} 
                />
              </Space>
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Details Grid */}
        <Row gutter={[32, 24]}>
          {/* Contact Info */}
          <Col xs={24} md={12}>
            <Title level={5}>Contact Details</Title>
            <Space orientation="vertical" size={12}>
              <Text><MailOutlined style={{ color: token.colorPrimary, marginRight: 8 }} /> {selectedMember.email}</Text>
              <Text><PhoneOutlined style={{ color: token.colorPrimary, marginRight: 8 }} /> {selectedMember.phone}</Text>
              <Text><CalendarOutlined style={{ color: token.colorPrimary, marginRight: 8 }} /> Joined: {selectedMember.registeredDate}</Text>
            </Space>
          </Col>

          {/* Skills Area */}
          <Col xs={24} md={12}>
            <Title level={5}>Technical Skills</Title>
            <Space wrap>
              {selectedMember.skills?.map(skill => (
                <Tag key={skill} bordered={false} color="purple">{skill}</Tag>
              )) || <Text type="secondary">No skills listed</Text>}
            </Space>
          </Col>
        </Row>

        <Divider />

        {/* Projects List */}
        <div style={{ marginBottom: 24 }}>
          <Title level={5}><ProjectOutlined /> Assigned Projects</Title>
          <List
            size="small"
            bordered
            style={{ borderRadius: 8, maxHeight: '200px', overflowY: 'auto' }}
            dataSource={memberProjects}
            renderItem={project => (
              <List.Item>
                <List.Item.Meta
                  avatar={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                  title={<Text strong>{project.name}</Text>}
                  description={<Text type="secondary" size="small">Role: {project.role}</Text>}
                />
              </List.Item>
            )}
            locale={{ emptyText: 'No active projects' }}
          />
        </div>

        {/* About / Bio */}
        {selectedMember.bio && (
          <div style={{ padding: 16, backgroundColor: token.colorFillAlter, borderRadius: 12 }}>
            <Title level={5}>About</Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>{selectedMember.bio}</Paragraph>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default MemberModal;
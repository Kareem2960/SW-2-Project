import React from 'react';
import { Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserAvatar = ({ name, id, avatarColor, size = 40 }) => {
  return (
    <Space>
      <Avatar size={size} style={{ backgroundColor: avatarColor }}>
        {name.charAt(0)}
      </Avatar>
      <Space orientation="vertical" size={0}>
        <Text strong>{name}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          ID: {id}
        </Text>
      </Space>
    </Space>
  );
};

export default UserAvatar;
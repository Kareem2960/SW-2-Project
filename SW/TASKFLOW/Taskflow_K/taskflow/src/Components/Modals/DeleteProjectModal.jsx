// ==================== Ant Design ====================
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ==================== Ant Design ====================

import { red } from '../../Constants/Colors';

const DeleteProjectModal = ({ open, setOpen, projectName = "this project", onConfirm }) => {
  return (
    <Modal
      title="Delete Project"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      width={400}
    >
      <Space orientation="vertical" style={{ width: '100%', textAlign: 'center' }}>
        <ExclamationCircleOutlined style={{ fontSize: 48, color: red }} />
        
        <h3>Are you sure?</h3>
        <p>Delete "{projectName}" permanently?</p>
        
        <Space style={{ marginTop: 20 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button danger onClick={() => {
            onConfirm?.();
            setOpen(false);
          }}>
            Delete
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default DeleteProjectModal;
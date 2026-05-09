import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
const getStatusColor = (status) => {
  const colors = {
    pending: { status: "warning", icon: <ExclamationCircleOutlined /> },

    "in-progress": { status: "processing", icon: <SyncOutlined spin /> },

    completed: { status: "success", icon: <CheckCircleOutlined /> },

    rejected: { status: "error", icon: <CloseCircleOutlined /> },
  };
  return colors[status] || "default";
};

export default getStatusColor;

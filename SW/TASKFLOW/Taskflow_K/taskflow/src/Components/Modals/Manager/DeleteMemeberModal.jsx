// ==================== Ant Design   ====================

import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
// ==================== Constants   ====================

import { red } from "../../../Constants/Colors";

const DeleteMemberModal = ({
  open,
  setOpen,
  memberName = "this member",
  onConfirm,
}) => {
  return (
    <Modal
      title="Delete Member"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      width={400}
    >
      <Space orientation="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: red,
            fontSize: 48,
          }}
        >
          <ExclamationCircleOutlined />
        </div>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h3>Are you sure?</h3>
          <p>Delete {memberName} from this project?</p>
        </div>

        <Space style={{ width: "100%", justifyContent: "center" }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            danger
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default DeleteMemberModal;

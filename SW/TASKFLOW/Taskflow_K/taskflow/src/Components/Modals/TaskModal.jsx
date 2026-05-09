// ==================== Ant Design ====================

import { Form } from "antd";
import { Modal, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

const TaskModal = ({
  isTaskModalOpen,
  setIsTaskModalOpen,
  task,
  handleSaveTask,
  form,
  members = [],
}) => {
  console.log(form)
  console.log(task);

  return (
    <Modal
      title={task ? "Edit Task" : "Add New Task"}
      open={isTaskModalOpen}
      onOk={handleSaveTask}
      onCancel={() => {
        setIsTaskModalOpen(false);
        form.resetFields();
      }}
      okText="Save"
      cancelText="Cancel"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: "",
          description: "",
          dueDate: dayjs(),
          priority: "Medium",
          status: "ToDo",
          assignedTo: undefined,
        }}
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: "Please enter task title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter task description" }]}
        >
          <TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>

        <Form.Item
          name="assignedTo"
          label="Assigned Member"
          rules={[{ required: true, message: "Please select a member" }]}
        >
          <Select placeholder="Select a member" options={members} />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select priority" }]}
        >
          <Select placeholder="Select priority">
            <Select.Option value="Low">Low</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="High">High</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select due date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="ToDo">To Do</Select.Option>
            <Select.Option value="InProgress">In Progress</Select.Option>
            <Select.Option value="Done">Done</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;

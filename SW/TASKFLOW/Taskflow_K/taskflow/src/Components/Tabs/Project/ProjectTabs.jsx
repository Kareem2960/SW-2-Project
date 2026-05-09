// ==================== Ant Design  ====================

import { Tabs } from "antd";
// ==================== Components  ====================

import StatusTab from "./StatusTab";
import TasksTab from "./TasksTab";
import TeamTab from "./TeamTab";
import ProjectFilesTab from "./ProjectFilesTab";

const onChange = (key) => {
  console.log(key);
};
const items = [
  { key: "1", label: "Kanban Board", children: <StatusTab /> },
  { key: "2", label: "Tasks List", children: <TasksTab /> },
  { key: "3", label: "Team", children: <TeamTab /> },
  { key: "4", label: "Files", children: <ProjectFilesTab /> },
];

const ProjectTabs = () => {
  return (
    <div style={{ padding: "0" }}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default ProjectTabs;

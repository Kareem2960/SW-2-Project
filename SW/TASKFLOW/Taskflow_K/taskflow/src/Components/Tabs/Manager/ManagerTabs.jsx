import { lazy } from "react";

// ==================== Ant Design  ====================

import Tabs from "antd/es/tabs";
import "antd/es/tabs/style";
// ==================== Components  ====================
const ProjectCards = lazy(() => import("../../Cards/ProjectCards"));

const ManagerTeams = lazy(() => import("../../Analytics/ManagerTeams"));
const ManagerAVGTasks = lazy(() => import("../../Analytics/ManagerAVGTasks"));
const onChange = (key) => {
  console.log(key);
};
const items = [
  { key: "1", label: "Your Projects", children: <ProjectCards /> },
  { key: "2", label: "Team Performance", children: <ManagerTeams /> },
  { key: "3", label: "Analytics", children: <ManagerAVGTasks /> },
];
const ManagerTabs = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
export default ManagerTabs;

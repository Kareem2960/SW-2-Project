import { Tabs } from "antd";
import MembersTab from "./MembersTab";
import ManagerTab from "./ManagersTab";
import UsersTab from "./UsersTab";

const UsersTabs = () => {

  const tabItems = [
    {
      key: "all",
      label: "Users",
      children: (
       <UsersTab/>
      ),
    },
    {
      key: "managers",
      label: "Managers",
      children: (
       <ManagerTab/>
      ),
    },
    {
      key: "members",
      label: "Memebrs",
      children: (
      <MembersTab/>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 24px" }}>
      <Tabs
        defaultActiveKey="pending"
        size="large"
        items={tabItems}
        animated={{ inkBar: true, tabPane: true }}
      />
     
    </div>
  );
};

export default UsersTabs;

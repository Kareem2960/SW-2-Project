import React, { useState } from "react";
import { Badge, Tabs, Card } from "antd";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import ManagersRequestTable from "../../Table/Admin/ManagersRequestTable";
import AllManagersTable from "../../Table/Admin/AllManagersTable";

const ManagersTabs = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const handleViewDetails = (record) => {
    setSelectedManager(record);
    setViewModalOpen(true);
  };

  const tabItems = [
    {
      key: "pending",
      label: (
        <span>
          Pending Approval <Badge count={2} offset={[10, -2]} size="small" />
        </span>
      ),
      children: <ManagersRequestTable handleViewDetails={handleViewDetails} />,
    },
    {
      key: "all",
      label: "All Managers",
      children: <AllManagersTable handleViewDetails={handleViewDetails} />,
    },
  ];

  return (
    <Card >
      <ManagerModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedManager={selectedManager}
      />
      <Tabs 
        defaultActiveKey="pending" 
        size="large" 
        items={tabItems} 
        animated={{ inkBar: true, tabPane: true }}
      />
    </Card>
  );
};

export default ManagersTabs;
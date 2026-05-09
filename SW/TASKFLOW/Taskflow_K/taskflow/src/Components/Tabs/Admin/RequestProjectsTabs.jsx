import React, { useState, useEffect } from "react";
import { App, Badge, Tabs } from "antd";
import ProjectModal from "../../Modals/ProjectModal";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import ProjectsRequestTable from "../../Table/Admin/ProjectsRequestTable";
import AllProjectsTable from "../../Table/Admin/AllProjectsTable";
import { api } from "../../../config/http";
import { userToManagerModalShape } from "../../../utils/userRole";

const RequestProjectsTabs = () => {
  const { message } = App.useApp();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [userDirectory, setUserDirectory] = useState([]);
  const [pendingManagerCount, setPendingManagerCount] = useState(0);

  useEffect(() => {
    api
      .get("/api/admin/users")
      .then((r) => setUserDirectory(r.data || []))
      .catch(() => setUserDirectory([]));
  }, []);

  useEffect(() => {
    api
      .get("/api/admin/pending-managers")
      .then((r) => setPendingManagerCount((r.data || []).length))
      .catch(() => setPendingManagerCount(0));
  }, []);

  const handleViewProjectDetails = (record) => {
    setSelectedProject(record);
    setProjectModalOpen(true);
  };

  const handleViewManagerDetails = (record) => {
    const mid = record.managerId ?? Number(record.projectManagerId);
    const u = userDirectory.find((x) => x.id === mid);
    const mgr = userToManagerModalShape(u);
    if (mgr) {
      setSelectedManager(mgr);
      setViewModalOpen(true);
    } else {
      message.info("Manager details not available");
    }
  };

  const tabItems = [
    {
      key: "pending",
      label: (
        <span>
          Pending Approval{" "}
          <Badge count={pendingManagerCount} offset={[10, -2]} size="small" />
        </span>
      ),
      children: (
        <ProjectsRequestTable
          handleViewProjectDetails={handleViewProjectDetails}
          handleViewManagerDetails={handleViewManagerDetails}
        />
      ),
    },
    {
      key: "all",
      label: "All Projects",
      children: (
        <AllProjectsTable
          handleViewProjectDetails={handleViewProjectDetails}
          handleViewManagerDetails={handleViewManagerDetails}
        />
      ),
    },
  ];

  return (
    <>
      <ProjectModal
        open={projectModalOpen}
        setOpen={setProjectModalOpen}
        project={selectedProject}
      />

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
    </>
  );
};

export default RequestProjectsTabs;

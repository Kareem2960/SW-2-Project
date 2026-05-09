import React, { useState, useEffect } from "react";
import { App } from "antd";
import { useTheme } from "../../Context/DarkModeProvider";
import AllProjectsTable from "../../Components/Table/Admin/AllProjectsTable";
import ProjectModal from "../../Components/Modals/ProjectModal";
import ManagerModal from "../../Components/Modals/Admin/ManagerModal";
import { api } from "../../config/http";
import { userToManagerModalShape } from "../../utils/userRole";

const ManageProjects = () => {
  const { message } = App.useApp();
  const { isDarkMode } = useTheme();
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [userDirectory, setUserDirectory] = useState([]);

  useEffect(() => {
    api
      .get("/api/admin/users")
      .then((r) => setUserDirectory(r.data || []))
      .catch(() => setUserDirectory([]));
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

  return (
    <>
      <div
        data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
        style={{ backgroundColor: isDarkMode ? "#0f172a" : "transparent", minHeight: "100vh", padding: "24px" }}
      >
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
        <AllProjectsTable
          handleViewProjectDetails={handleViewProjectDetails}
          handleViewManagerDetails={handleViewManagerDetails}
        />
      </div>
    </>
  );
};

export default ManageProjects;

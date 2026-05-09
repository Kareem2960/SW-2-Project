import React, { useState, useEffect } from "react";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import UsersTable from "../../Table/Admin/UsersTable";
import { api } from "../../../config/http";
import { primaryRole, displayNameFromUser } from "../../../utils/userRole";

const ManagerTab = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/users");
      const managersData = (response.data || [])
        .filter((user) => primaryRole(user.roles) === "Manager")
        .map((user) => ({
          id: user.id?.toString() || Math.random().toString(),
          name: displayNameFromUser(user) || "Unknown",
          email: user.userName || "",
          phone: user.phoneNumber || "",
          role: "manager",
          roleName: "Project Manager",
          status: "active",
          registeredDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : "",
          lastActive: "",
          company: "",
          experience: 0,
          projectsCount: 0,
          avatarColor: "#1890ff",
          bio: "",
          userName: user.userName || "",
        }));
      setDataSource(managersData);
    } catch (error) {
      console.error("Error fetching managers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedManager(record);
    setManagerModalOpen(true);
  };

  return (
    <div>
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
        loading={loading}
      />
      {/* Manager Details Modal */}
      <ManagerModal
        viewModalOpen={managerModalOpen}
        setViewModalOpen={setManagerModalOpen}
        selectedManager={selectedManager}
      />
    </div>
  );
};

export default ManagerTab;

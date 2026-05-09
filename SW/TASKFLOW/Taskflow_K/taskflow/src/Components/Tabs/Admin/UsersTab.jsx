import React, { useState, useEffect } from "react";
import ManagerModal from "../../Modals/Admin/ManagerModal";
import MemberModal from "../../Modals/Admin/MemberModal";
import UsersTable from "../../Table/Admin/UsersTable";
import { api } from "../../../config/http";
import { primaryRole, displayNameFromUser } from "../../../utils/userRole";

const UsersTab = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedMemeber, setSelectedMemeber] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/users");
      const usersData = (response.data || []).map((user) => ({
        id: user.id?.toString() || Math.random().toString(),
        name: displayNameFromUser(user) || "Unknown",
        email: user.userName || "",
        role: primaryRole(user.roles).toLowerCase(),
        userName: user.userName || "",
        status: user.isApproved ? "active" : "pending",
      }));
      setDataSource(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    if (record.role == "member") {
      setSelectedMemeber(record);
      setMemberModalOpen(true);
    } else {
      setSelectedManager(record);
      setManagerModalOpen(true);
    }
  };
  return (
    <>
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
        loading={loading}
      />
      <ManagerModal
        viewModalOpen={managerModalOpen}
        setViewModalOpen={setManagerModalOpen}
        selectedManager={selectedManager}
      />

      <MemberModal
        viewModalOpen={memberModalOpen}
        setViewModalOpen={setMemberModalOpen}
        selectedMemeber={selectedMemeber}
      />
    </>
  );
};

export default UsersTab;

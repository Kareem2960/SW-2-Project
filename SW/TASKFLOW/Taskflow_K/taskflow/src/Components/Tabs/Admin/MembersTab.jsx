import { useState, useEffect } from "react";
import UsersTable from "../../Table/Admin/UsersTable";
import MemberModal from "../../Modals/Admin/MemberModal";
import { api } from "../../../config/http";
import { primaryRole, displayNameFromUser } from "../../../utils/userRole";

const MembersTab = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/users");
      const membersData = (response.data || [])
        .filter((user) => primaryRole(user.roles) === "Member")
        .map((user) => ({
          id: user.id?.toString() || Math.random().toString(),
          name: displayNameFromUser(user) || "Unknown",
          email: user.userName || "",
          phone: user.phoneNumber || "",
          role: "member",
          roleName: "Team Member",
          status: "active",
          registeredDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : "",
          lastActive: "",
          skills: [],
          projectsCount: 0,
          avatarColor: "#722ed1",
          userName: user.userName || "",
        }));
      setDataSource(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedMember(record);
    setMemberModalOpen(true);
  };

  return (
    <div>
      <MemberModal
        viewModalOpen={memberModalOpen}
        setViewModalOpen={setMemberModalOpen}
        selectedMember={selectedMember}
      />
      <UsersTable
        handleViewDetails={handleViewDetails}
        dataSource={dataSource}
        loading={loading}
      />
    </div>
  );
};

export default MembersTab;

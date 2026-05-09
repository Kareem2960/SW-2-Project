import { Table } from "antd";

import Managerscolumns from "../Columns/ManagersColumns";

// ===== STATIC DATA =====
const mockManagers = [
  {
    id: "1",
    name: "Ahmed Mansour",
    email: "ahmed.mansour@pm.com",
    phone: "+20 123 456 789",
    company: "Nile Construction",
    experience: 8,
    status: "pending",
    registeredDate: "2024-03-15",
    avatarColor: "#1890ff",
    bio: "Senior project manager with 8+ years in large-scale residential projects.",
  },
  {
    id: "2",
    name: "Sara Khaled",
    email: "sara.khaled@pm.com",
    phone: "+20 987 654 321",
    company: "Delta Builders",
    experience: 5,
    status: "pending",
    registeredDate: "2024-03-14",
    avatarColor: "#52c41a",
    bio: "Certified PMP focusing on sustainable and eco-friendly constructions.",
  },
  {
    id: "3",
    name: "Omar Hassan",
    email: "omar.hassan@pm.com",
    phone: "+20 112 233 445",
    company: "Pyramids Engineering",
    experience: 12,
    status: "approved",
    registeredDate: "2024-03-10",
    avatarColor: "#faad14",
    bio: "Expert in infrastructure and mega projects with international experience.",
  },
  {
    id: "4",
    name: "Laila Mostafa",
    email: "laila.mostafa@pm.com",
    phone: "+20 554 433 221",
    company: "Modern Architects",
    experience: 3,
    status: "rejected",
    registeredDate: "2024-03-12",
    avatarColor: "#eb2f96",
    bio: "Junior PM with strong technical background in BIM software.",
  },
];
const ManagersRequestTable = ({ handleViewDetails }) => {
  // Table columns

  return (
    <Table
      columns={Managerscolumns(handleViewDetails)}
      dataSource={mockManagers}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showTotal: (total) => `Total ${total} items`,
      }}
      locale={{ emptyText: "No pending requests" }}
      scroll={{ x: 1000 }}
    />
  );
};

export default ManagersRequestTable;

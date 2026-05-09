import { Link } from "react-router-dom";

// ==================== Icons ====================
import { PieChartOutlined, SettingOutlined } from "@ant-design/icons";

import { FaUserFriends, FaFolderOpen, FaUserCheck } from "react-icons/fa";
import { IoMdGitPullRequest } from "react-icons/io";

const adminMenu = [
  {
    key: "1",
    icon: <PieChartOutlined style={{ fontSize: "18px" }} />,
    label: <Link to="">Dashboard</Link>,
  },
  {
    type: "divider",
  },
  {
    key: "grp-management",
    label: "Management",
    type: "group",
    children: [
      {
        key: "2",
        icon: <FaUserFriends />,
        label: <Link to="users">Users & Projects</Link>,
      },
    ],
  },
  {
    key: "grp-requests",
    label: "Pending Approvals",
    type: "group",
    children: [
      {
        key: "3",
        icon: <IoMdGitPullRequest />,
        label: <Link to="requests">Requests</Link>,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "5",
    icon: <SettingOutlined />,
    label: <Link to="settings">General Settings</Link>,
  },
];

export { adminMenu };

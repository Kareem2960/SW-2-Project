import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/DarkModeProvider";
import { useAuth } from "../../../Context/AuthContext";

import { Header } from "antd/es/layout/layout";
import { Grid, Avatar, Typography, Tooltip, Button, Flex } from "antd";

// ==================== Components  ====================

import DarkModeBtn from "../../Buttons/DarkModeBtn";

// ==================== Icons  ====================

import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LogOut } from "lucide-react";

const AdminNavbar = ({ adminName = "Admin" }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 md:px-8 ${
        isDarkMode
          ? "border-slate-700 bg-slate-950"
          : "border-slate-200 bg-white"
      }`}
    >
      <h1
        className={`text-sm font-medium md:text-base ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}
      >
        Welcome back, {adminName}!
      </h1>

      <div className="flex items-center gap-2 md:gap-3">
        <Flex align="center" gap={20}>
          <Tooltip title="Notifications">
            <Button
              type="text"
              shape="circle"
              icon={<IoIosNotificationsOutline style={{ fontSize: 20, color: isDarkMode ? "#e2e8f0" : "inherit" }} />}
              onClick={() => navigate("/admin/notifications")}
            />
          </Tooltip>

          <Tooltip title="Profile">
            <Avatar
              icon={<FaRegUser style={{ color: "white" }} />}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/settings")}
            />
          </Tooltip>

          <Tooltip title="Logout">
            <Button
              type="text"
              shape="circle"
              icon={<LogOut size={20} style={{ color: isDarkMode ? "#e2e8f0" : "inherit" }} />}
              onClick={handleLogout}
            />
          </Tooltip>

          <DarkModeBtn />
        </Flex>
      </div>
    </header>
  );
};

export default AdminNavbar;

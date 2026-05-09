// ==================== Ant Design  ====================

import Sider from "antd/es/layout/Sider.js";
import Menu from "antd/es/menu";
import "antd/es/menu/style";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../Context/DarkModeProvider";
// ====================React-router-dom  ====================

const SideBar = ({ colorBgContainer, items, selectedKey }) => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");
  const { isDarkMode } = useTheme();

  // Admin sidebar style
  if (isAdmin) {
    return (
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        width={280}
        style={{
          background: isDarkMode ? "#1e293b" : "#f5f5f5",
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          borderRight: isDarkMode ? "1px solid #334155" : "1px solid #e8e8e8",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{
            height: "100%",
            borderInlineEnd: 0,
            marginTop: "2rem",
            background: "transparent",
            fontSize: "14px",
            padding: "8px 0",
          }}
          items={items}
        />
        <style>{`
          .ant-menu-item-selected {
            background-color: ${isDarkMode ? '#334155' : '#e5e7eb'} !important;
            color: ${isDarkMode ? '#e2e8f0' : '#333'} !important;
          }
          .ant-menu-item-selected::before {
            background-color: transparent !important;
          }
          .ant-menu-item {
            color: ${isDarkMode ? '#e2e8f0' : '#333'} !important;
            font-weight: 500 !important;
            margin: 4px 16px !important;
            border-radius: 6px !important;
            height: 44px !important;
            display: flex !important;
            align-items: center !important;
          }
          .ant-menu-item:hover {
            background-color: ${isDarkMode ? '#334155' : '#e5e7eb'} !important;
            color: ${isDarkMode ? '#e2e8f0' : '#333'} !important;
          }
          .ant-menu-item-selected:hover {
            background-color: ${isDarkMode ? '#334155' : '#e5e7eb'} !important;
          }
          .ant-menu-item-group-title {
            color: ${isDarkMode ? '#94a3b8' : '#999'} !important;
            font-weight: 600 !important;
            font-size: 11px !important;
            letter-spacing: 0.05em !important;
            padding: 12px 16px 8px !important;
            text-transform: none !important;
          }
          .ant-menu::after {
            border: none !important;
          }
          .ant-menu-item svg {
            margin-right: 8px !important;
            color: ${isDarkMode ? '#e2e8f0' : 'inherit'} !important;
          }
        `}</style>
        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "16px",
            borderTop: isDarkMode ? "1px solid #334155" : "1px solid #e8e8e8",
            background: isDarkMode ? "#0f172a" : "#fafafa",
            textAlign: "center",
            fontSize: "13px",
            color: isDarkMode ? "#94a3b8" : "#666",
            fontWeight: 500,
          }}
        >
          Team Member
        </div>
      </Sider>
    );
  }

  // Default RTL sidebar
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      width={220}
      style={{
        background: isDarkMode ? "#1e293b" : "linear-gradient(180deg, #faf0e8 0%, #fef5f0 100%)",
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        insetInlineStart: "auto",
        insetInlineEnd: 0,
        top: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
        borderLeft: isDarkMode ? "1px solid #334155" : "1px solid rgba(239, 109, 75, 0.12)",
        borderRight: "none",
        boxShadow: isDarkMode ? "-2px 0 12px rgba(0, 0, 0, 0.3)" : "-2px 0 12px rgba(239, 109, 75, 0.06)",
        direction: "rtl",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          height: "100%",
          borderInlineEnd: 0,
          marginTop: "4rem",
          background: "transparent",
          fontSize: "14px",
          direction: "rtl",
          textAlign: "right",
        }}
        items={items}
      />
      <style>{`
        .ant-menu-item-selected {
          background-color: ${isDarkMode ? '#334155' : 'rgba(239, 109, 75, 0.12)'} !important;
          color: ${isDarkMode ? '#e2e8f0' : '#ef6d4b'} !important;
        }
        .ant-menu-item-selected::before {
          background-color: ${isDarkMode ? '#334155' : '#ef6d4b'} !important;
        }
        .ant-menu-item:hover {
          background-color: ${isDarkMode ? '#334155' : 'rgba(239, 109, 75, 0.08)'} !important;
          color: ${isDarkMode ? '#e2e8f0' : '#ef6d4b'} !important;
        }
        .ant-menu-submenu-title:hover {
          background-color: ${isDarkMode ? '#334155' : 'rgba(239, 109, 75, 0.08)'} !important;
          color: ${isDarkMode ? '#e2e8f0' : '#ef6d4b'} !important;
        }
        .ant-menu-item, .ant-menu-submenu-title {
          color: ${isDarkMode ? '#e2e8f0' : '#6b7280'} !important;
          transition: all 0.3s ease !important;
          text-align: right !important;
          padding-inline-start: 24px !important;
          padding-inline-end: 16px !important;
        }
        .ant-menu-item-group-title {
          color: ${isDarkMode ? '#94a3b8' : '#9ca3af'} !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          letter-spacing: 0.05em !important;
          text-align: right !important;
          text-transform: capitalize !important;
          padding-inline-start: 24px !important;
          padding-inline-end: 16px !important;
        }
        .ant-menu::after {
          border: none !important;
        }
        .ant-menu-item svg {
          color: ${isDarkMode ? '#e2e8f0' : 'inherit'} !important;
        }
      `}</style>
    </Sider>
  );
};

export default SideBar;

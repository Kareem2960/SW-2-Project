// ==================== Ant Design  ====================
import { Layout, theme } from "antd";

// ==================== Components  ====================
import ManagerSidebar from "../Components/Manager/Layout/ManagerSidebar.jsx";
import ManagerNavbar from "../Components/Manager/Layout/ManagerNavbar.jsx";
import DynamicBreadcrumb from "../Components/DynamicBreadCrumb/DynamicBreadCrumb.jsx";
import { useTheme } from "../Context/DarkModeProvider";

// ==================== react-router-dom  ====================

import { Outlet } from "react-router-dom";

const { Content } = Layout;

const ManagerLayout = () => {
  const { isDarkMode } = useTheme();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }}>
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <ManagerNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <DynamicBreadcrumb />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: isDarkMode ? '#1e293b' : colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div data-aos="fade-up" data-aos-anchor-placement="top-center">
              <Outlet />
            </div>
          </Content>
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;

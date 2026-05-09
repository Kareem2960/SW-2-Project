// ==================== Ant Design  ====================
import { Layout, theme } from "antd";

// ==================== Components  ====================
import AdminSidebar from "../Components/Admin/Layout/AdminSidebar.jsx";
import AdminNavbar from "../Components/Admin/Layout/AdminNavbar.jsx";
import DynamicBreadcrumb from "../Components/DynamicBreadCrumb/DynamicBreadCrumb.jsx";

// ==================== react-router-dom  ====================

import { Outlet } from "react-router-dom";
import { useTheme } from "../Context/DarkModeProvider";

const { Content } = Layout;

const AdminLayout = () => {
  const { isDarkMode } = useTheme();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
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

export default AdminLayout;

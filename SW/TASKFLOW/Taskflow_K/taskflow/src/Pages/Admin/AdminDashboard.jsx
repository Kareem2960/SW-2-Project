import React from 'react';
import { useTheme } from '../../Context/DarkModeProvider';
import DashboardMonitor from '../../Components/Admin/DashboardMonitor';
import DashboardOverview from '../../Components/Admin/DashboardOverview';
import DashboardCards from '../../Components/Admin/DashboardCards';
import DashboardApproval from '../../Components/Admin/DashboardApproval';
import DashboardStatus from '../../Components/Admin/DashboardStatus';
import DashboardUsers from '../../Components/Admin/DashboardUsers';

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: isDarkMode ? '#0f172a' : 'transparent'
      }}
    >
      <DashboardMonitor />
      <DashboardCards />
      <DashboardOverview />
      <DashboardApproval />
      <DashboardUsers />
      <DashboardStatus />
    </div>
  )
}

export default AdminDashboard

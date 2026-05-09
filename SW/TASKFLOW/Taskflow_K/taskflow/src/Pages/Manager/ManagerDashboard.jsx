import { lazy } from "react";

// ==================== Ant Design  ====================

import Flex from "antd/es/flex";
import "antd/es/flex/style";

import Typography from "antd/es/typography";
import "antd/es/typography/style";
const { Title, Paragraph } = Typography;

// ==================== Icons  ====================

import { IoIosAdd } from "react-icons/io";
// ==================== Constants  ====================

import { Link } from "react-router-dom";
import { Button } from "antd";
// ==================== Components  ====================

const ManagerCards = lazy(() => import("../../Components/Cards/ManagerCards"));

const ManagerTabs = lazy(
  () => import("../../Components/Tabs/Manager/ManagerTabs"),
);

const ManagerDashboard = () => {
  return (
    <>
      <Flex className="flex justify-between">
        <div>
          <Title level={2} className="font-bold">
            Project Dashboard
          </Title>
          <Paragraph>
            Manage your projects, track progress, and analyze performance
          </Paragraph>
        </div>
        <Link to="projects/create-project">
          <Button
            type="primary"
            icon={<IoIosAdd />}
            size="large"
            style={{
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              fontWeight: "600",
              boxShadow: "0 2px 4px rgba(24, 144, 255, 0.2)",
            }}
          >
            Create Project
          </Button>
        </Link>
      </Flex>

      <div>
        <ManagerCards />
      </div>

      <div>
        <ManagerTabs />
      </div>
    </>
  );
};

export default ManagerDashboard;

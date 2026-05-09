import { Header } from "antd/es/layout/layout";
import { Grid, Avatar, Typography, Tooltip, Button, Flex, Badge } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

// ==================== Components ====================
import OpenDrawerBtn from "../Buttons/OpenDrawerBtn";
import Logo from "../Logo/Logo";
import DarkModeBtn from "../Buttons/DarkModeBtn";
import { useTheme } from "../../Context/DarkModeProvider";

// ==================== Icons ====================
import { FaRegUser } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const Nav = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");
  const { isDarkMode } = useTheme();

  // Admin navbar - dark background
  if (isAdmin) {
    return (
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDarkMode ? "#1e293b" : "#2c3e50",
          padding: isMobile ? "0 12px" : "0 24px",
          height: "64px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
          <Flex align="center" gap={isMobile ? 8 : 16}>
            {isMobile && <OpenDrawerBtn />}
            <Logo collapsed={isMobile} />
          </Flex>

          <Flex align="center" gap={isMobile ? 12 : 20}>
            {!isMobile && (
              <div style={{ textAlign: "right", lineHeight: "1.3" }}>
                <Text
                  strong
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: isDarkMode ? "#e2e8f0" : "white",
                    fontWeight: 600,
                  }}
                >
                  Welcome back, Emma!
                </Text>
              </div>
            )}

            <Flex align="center" gap={10}>
              <Tooltip title="Notifications">
                <Badge dot color="#ef6d4b" offset={[-2, 4]}>
                  <Button
                    type="text"
                    shape="circle"
                    icon={
                      <IoIosNotificationsOutline
                        style={{ fontSize: 20, color: isDarkMode ? "#fff" : "white" }}
                      />
                    }
                    onClick={() => navigate("/admin/notifications")}
                  />
                </Badge>
              </Tooltip>

              <DarkModeBtn />

              <Tooltip title="Account Settings">
                <Avatar
                  size="default"
                  icon={<FaRegUser style={{ color: "white" }} />}
                  style={{
                    cursor: "pointer",
                    background: "#ef6d4b",
                  }}
                  onClick={() => navigate("/admin/settings")}
                />
              </Tooltip>
            </Flex>
          </Flex>
        </Header>
    );
  }

  // Default navbar - beige gradient
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isDarkMode ? "#1e293b" : "linear-gradient(135deg, #faf0e8 0%, #fef5f0 100%)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(239, 109, 75, 0.08)",
        padding: isMobile ? "0 12px" : "0 32px",
        height: "68px",
        transition: "all 0.3s ease",
        borderBottom: isDarkMode ? "1px solid #334155" : "1px solid rgba(239, 109, 75, 0.12)",
      }}
    >
      <Flex align="center" gap={isMobile ? 8 : 24}>
        {isMobile && <OpenDrawerBtn />}
        <Logo collapsed={isMobile} />
      </Flex>

      <Flex align="center" gap={isMobile ? 12 : 24}>
        {!isMobile && (
          <div style={{ textAlign: "right", lineHeight: "1.3" }}>
            <Text
              strong
              style={{
                display: "block",
                fontSize: "14px",
                color: isDarkMode ? "#e2e8f0" : "#1e1e2e",
                fontWeight: 600,
              }}
            >
              Sarah Jenkins
            </Text>
            <Text style={{ fontSize: "12px", color: isDarkMode ? "#94a3b8" : "#6b7280" }}>
              Project Manager
            </Text>
          </div>
        )}

        <div
          style={{
            width: "1px",
            height: "24px",
            background: isDarkMode ? "#334155" : "rgba(239, 109, 75, 0.2)",
          }}
        />

        <Flex align="center" gap={12}>
          <Tooltip title="Notifications">
            <Badge dot color="#ef6d4b" offset={[-2, 4]}>
              <Button
                type="text"
                shape="circle"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                icon={
                  <IoIosNotificationsOutline
                    style={{ fontSize: 22, color: isDarkMode ? "#e2e8f0" : "#ef6d4b", fill: isDarkMode ? "#e2e8f0" : "#ef6d4b" }}
                  />
                }
                onClick={() => navigate("/notifications")}
              />
            </Badge>
          </Tooltip>

          <DarkModeBtn />

          <Tooltip title="Account Settings">
            <Avatar
              size="large"
              icon={<FaRegUser />}
              style={{
                cursor: "pointer",
                background: "linear-gradient(135deg, #ef6d4b 0%, #dc5b43 100%)",
                boxShadow: "0 4px 12px rgba(239, 109, 75, 0.25)",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/settings")}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Header>
  );
};

export default Nav;

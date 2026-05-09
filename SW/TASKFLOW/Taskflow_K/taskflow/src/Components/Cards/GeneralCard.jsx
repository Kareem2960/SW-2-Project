// ==================== Ant Design  ====================

import { Card, Statistic, Progress } from "antd";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// ==================== Constants  ====================

import { green, primaryColor, red } from "../../Constants/Colors";
import { useTheme } from "../../Context/DarkModeProvider";

const GeneralCard = ({
  title,
  value,
  icon,
  color,
  trend,
  trendValue,
  progress,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)",
        height: "100%",
        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
      }}
      styles={{ body: { padding: 20 } }}
    >
      <div data-aos="fade-down">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <Statistic
              title={
                <span
                  style={{ fontSize: 14, fontWeight: 500, color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}
                >
                  {title}
                </span>
              }
              value={value}
              styles={{
                fontSize: 28,
                fontWeight: 600,
                color: color || primaryColor,
              }}
            />
            {trend && (
              <div style={{ marginTop: 8 }}>
                <span style={{ color: trend === "up" ? green : red }}>
                  {trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                  <span style={{ marginLeft: 4 }}>{trendValue}%</span>
                </span>
                <span style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c", marginLeft: 8 }}>
                  from last month
                </span>
              </div>
            )}
          </div>
          <div
            style={{
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: color || primaryColor,
            }}
          >
            {icon}
          </div>
        </div>

        {progress !== undefined && progress > 0 && (
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor={color || primaryColor}
            style={{ marginTop: 16 }}
          />
        )}
      </div>
    </Card>
  );
};

export default GeneralCard;

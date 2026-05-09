// ==================== Ant Design  ====================
import { Typography, Card } from "antd";
import { useState, useEffect } from "react";
// ==================== recharts  ====================

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// ==================== Constants  ====================

import { purple } from "../../Constants/Colors";
import { api } from "../../config/http";
import { useTheme } from "../../Context/DarkModeProvider";

const { Title, Text } = Typography;

const ManagerAVGTasks = () => {
  const [avgProgressData, setAvgProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/projects");
      const projects = response.data;

      const projectProgresses = projects.map(p => {
        if (!p.tasks || p.tasks.length === 0) return 0;
        const completed = p.tasks.filter(t => t.status === 'Done').length;
        return Math.round((completed / p.tasks.length) * 100);
      });

      const toDoProjects = projectProgresses.filter(p => p === 0);
      const inProgressProjects = projectProgresses.filter(p => p > 0 && p < 100);

      const toDoAvg = toDoProjects.length > 0 ? 2 : 0;
      const inProgressAvg = inProgressProjects.length > 0
        ? Math.round(inProgressProjects.reduce((a, b) => a + b, 0) / inProgressProjects.length)
        : 0;
      const completedAvg = 100;

      const inProgressRange = inProgressProjects.length > 0
        ? [Math.min(...inProgressProjects), Math.max(...inProgressProjects)]
        : [0, 0];

      setAvgProgressData([
        {
          status: "To Do",
          range: [0, 5],
          avg: toDoAvg,
        },
        {
          status: "In Progress",
          range: inProgressRange,
          avg: inProgressAvg,
        },
        {
          status: "Completed",
          range: [100, 100],
          avg: completedAvg,
        },
      ]);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#fff",
            padding: "10px",
            border: isDarkMode ? "1px solid #334155" : "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontWeight: "bold", margin: 0, color: isDarkMode ? "#e2e8f0" : "#333" }}>{label}</p>
          <p style={{ color: purple, margin: 0 }}>
            Avg Progress: {payload[0].value}%
          </p>
          {payload[1] && (
            <p style={{ color: isDarkMode ? "#94a3b8" : "#999", fontSize: "12px" }}>
              Range: {payload[1].value[0]}% - {payload[1].value[1]}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card style={{ borderRadius: "16px", border: isDarkMode ? '1px solid #334155' : '1px solid #f0f0f0', backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>
      <Title level={3} style={{ color: isDarkMode ? "#e2e8f0" : "#333" }}>Average Task Progress</Title>
      <Text type="secondary" style={{ color: isDarkMode ? "#94a3b8" : "#8c8c8c" }}>
        Progression mean vs. range across task statuses
      </Text>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <div style={{ width: "100%", height: 350, marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={avgProgressData}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={isDarkMode ? "#334155" : "#f0f0f0"}
              />
              <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#e2e8f0' : '#595959' }} />
              <YAxis
                unit="%"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDarkMode ? '#94a3b8' : '#8c8c8c' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" />

              <Area
                name="Progress Range"
                type="monotone"
                dataKey="range"
                fill={isDarkMode ? "#334155" : "#e0e7ff"}
                stroke="none"
                connectNulls
              />

              <Line
                name="Average Progress"
                type="monotone"
                dataKey="avg"
                stroke={purple}
                strokeWidth={3}
                dot={{ r: 6, fill: purple }}
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};

export default ManagerAVGTasks;

// ==================== Ant Design  ====================
import { Typography, Card } from "antd";
import { useState, useEffect } from "react";
// ==================== recharts  ====================

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from 'recharts';
// ==================== Constants  ====================

import { purple } from '../../Constants/Colors';
import { api } from '../../config/http';
import { useTheme } from '../../Context/DarkModeProvider';

const { Title, Text } = Typography;

const ManagerTeams = () => {
  const [statusDistribution, setStatusDistribution] = useState([]);
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

      const completed = projects.filter(p => {
        if (!p.tasks || p.tasks.length === 0) return false;
        return p.tasks.every(t => t.status === 'Done');
      }).length;

      const inProgress = projects.filter(p => {
        if (!p.tasks || p.tasks.length === 0) return false;
        return p.tasks.some(t => t.status === 'InProgress') && !p.tasks.every(t => t.status === 'Done');
      }).length;

      const toDo = projects.filter(p => {
        if (!p.tasks || p.tasks.length === 0) return true;
        return p.tasks.every(t => t.status === 'ToDo');
      }).length;

      setStatusDistribution([
        { status: 'Completed', teamCount: completed, color: purple },
        { status: 'In Progress', teamCount: inProgress, color: '#818cf8' },
        { status: 'To Do', teamCount: toDo, color: '#e0e7ff' },
      ]);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ borderRadius: '16px', border: isDarkMode ? '1px solid #334155' : '1px solid #f0f0f0', backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }}>
      <header style={{ marginBottom: '24px' }}>
        <Title level={3} style={{ marginBottom: '4px', color: isDarkMode ? '#e2e8f0' : '#333' }}>System Team Status</Title>
        <Text type="secondary" style={{ color: isDarkMode ? '#94a3b8' : '#8c8c8c' }}>
          Total count of teams grouped by current progression state
        </Text>
      </header>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={statusDistribution}
              margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#f0f0f0'} />
              <XAxis
                dataKey="status"
                axisLine={false}
                tickLine={false}
                tick={{ fill: isDarkMode ? '#e2e8f0' : '#595959', fontSize: 13, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{ fill: isDarkMode ? '#94a3b8' : '#8c8c8c' }}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff'
                }}
                formatter={(value) => [`${value} Teams`, 'Count']}
              />

              <Bar
                dataKey="teamCount"
                radius={[6, 6, 0, 0]}
                barSize={60}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Text strong style={{ color: purple, fontSize: '16px' }}>
            Total Teams in System: {statusDistribution.reduce((a, b) => a + b.teamCount, 0)}
          </Text>
        </div>
        </>
      )}
    </Card>
  );
};

export default ManagerTeams;
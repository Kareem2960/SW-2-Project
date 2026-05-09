import { Row, Col } from "antd";
import { useState, useEffect } from "react";
import {
  FaFolder,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
// ==================== Components  ====================

import GeneralCard from "./GeneralCard";
import { api } from "../../config/http";

const ManagerCards = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          api.get("/api/projects"),
          api.get("/api/tasks")
        ]);
        setProjects(projectsRes.data);
        setTasks(tasksRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const totalProjects = projects.length;
  const activeProjects = projects.length;
  const completedTasks = tasks.filter(t => t.status === "Done").length;
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(t => t.status === "InProgress").length;

  const cards = [
    {
      title: "Total Projects",
      icon: <FaFolder />,
      value: totalProjects,
      color: "#3b82f6",
    },
    {
      title: "Active Projects",
      icon: <FaClock />,
      value: activeProjects,
      color: "#f59e0b",
      progress: totalProjects ? (activeProjects / totalProjects) * 100 : 0,
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckCircle />,
      value: completedTasks,
      color: "#22c55e",
    },
    {
      title: "In Progress Tasks",
      icon: <FaExclamationTriangle />,
      value: inProgressTasks,
      color: "#ef4444",
      progress: totalTasks ? (inProgressTasks / totalTasks) * 100 : 0,
    },
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      {cards.map((card, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <div data-aos="fade-down" data-aos-delay={index * 100} style={{height:"100%"}}>
            <GeneralCard {...card} />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ManagerCards;

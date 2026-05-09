// ==================== Ant Design  ====================

import { Col, Row } from "antd";
import { useState, useEffect } from "react";
// ==================== Components  ====================

import ProjectCard from "./ProjectCard";
import { api } from "../../config/http";

const ProjectCards = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/projects");
      const projects = response.data.map((project) => ({
        id: project.id,
        title: project.name,
        status: "active",
        description: project.description || "No description",
        progress: project.tasks?.length > 0 
          ? Math.round((project.tasks.filter(t => t.status === 'Done').length / project.tasks.length) * 100)
          : 0,
        tasksCompleted: project.tasks?.filter(t => t.status === 'Done').length || 0,
        totalTasks: project.tasks?.length || 0,
        team: project.members?.map(m => ({
          id: m.firstName?.[0] || "U",
          name: `${m.firstName} ${m.lastName}`,
          color: "#597ef7"
        })) || [],
        dueDate: project.dueDate || "No due date",
      }));
      setProjectData(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <Row gutter={[16, 16]}>
          {projectData.map((project, index) => (
            <Col key={project.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <div
                data-aos="fade-down"
                data-aos-delay={index * 100}
                style={{ height: "100%" }}
              >
                <ProjectCard project={project} />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProjectCards;

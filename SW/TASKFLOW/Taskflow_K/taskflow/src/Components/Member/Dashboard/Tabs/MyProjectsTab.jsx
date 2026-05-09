import React, { useState, useEffect } from "react";
import ProjectCard from "../../Projects/ProjectCard";
import { api } from "../../../../config/http";
import { projectService } from "../../../../services/projectService";
import { normalizeTaskUiStatus } from "../../../../utils/taskStatus";

const MyProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectsWithStats();
  }, []);

  const fetchProjectsWithStats = async () => {
    try {
      const [myProjects, myTasksRes] = await Promise.all([
        projectService.listMine(),
        api.get("/api/tasks/my-tasks").catch(() => ({ data: [] })),
      ]);
      const list = Array.isArray(myProjects) ? myProjects : [];
      const myTasks = Array.isArray(myTasksRes.data) ? myTasksRes.data : [];

      const projectsWithStats = list.map((project) => {
        const forProj = myTasks.filter(
          (t) => Number(t.projectId) === Number(project.id),
        );
        const done = forProj.filter(
          (t) => normalizeTaskUiStatus(t.status) === "completed",
        ).length;
        const total = forProj.length;
        return {
          id: project.id.toString(),
          name: project.name,
          manager:
            project.managerId != null
              ? `Manager #${project.managerId}`
              : "Unknown",
          dueDate: "No due date",
          progress: total > 0 ? Math.round((done / total) * 100) : 0,
          tasks: total,
        };
      });
      setProjects(projectsWithStats);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};

export default MyProjectsTab;

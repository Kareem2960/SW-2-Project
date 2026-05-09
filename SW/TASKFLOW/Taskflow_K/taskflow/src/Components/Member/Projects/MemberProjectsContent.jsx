import React, { useMemo, useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import { useTheme } from "../../../Context/DarkModeProvider";
import { api } from "../../../config/http";
import { projectService } from "../../../services/projectService";
import { normalizeTaskUiStatus } from "../../../utils/taskStatus";

const MemberProjectsContent = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(() => {
    const saved = localStorage.getItem("memberProjectsActiveFilter");
    return saved || "All";
  });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    localStorage.setItem("memberProjectsActiveFilter", activeFilter);
  }, [activeFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const [projectsRes, tasksRes] = await Promise.all([
        projectService.listMine(),
        api.get("/api/tasks/my-tasks").catch(() => ({ data: [] })),
      ]);
      const projectsData = Array.isArray(projectsRes) ? projectsRes : [];
      const allTasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];
      const formattedProjects = projectsData.map((project) => {
        const forProj = allTasks.filter(
          (t) => Number(t.projectId) === Number(project.id),
        );
        const done = forProj.filter(
          (t) => normalizeTaskUiStatus(t.status) === "completed",
        ).length;

        const membersFlat = Array.isArray(project.members)
          ? project.members.map((m) => ({
              userId: m.userId,
              firstName: "User",
              lastName: `#${m.userId ?? ""}`,
            }))
          : [];

        const managerLabel =
          project.managerId != null
            ? `Manager #${project.managerId}`
            : "Unknown Manager";

        return {
          id: project.id.toString(),
          name: project.name,
          description: project.description || "No description",
          manager: managerLabel,
          managerInitials:
            project.managerId != null
              ? String(project.managerId).slice(0, 2)
              : "UM",
          dueDate: project.dueDate
            ? new Date(project.dueDate).toLocaleDateString()
            : "No due date",
          progress:
            forProj.length > 0
              ? Math.round((done / forProj.length) * 100)
              : 0,
          tasksDone: done,
          tasksTotal: forProj.length,
          teamMembers:
            membersFlat.length > 0
              ? membersFlat.length
              : project.members?.length || 0,
          status: "active",
          tasks: forProj.slice(0, 8),
          members: membersFlat,
        };
      });
      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter(
      (project) => project.status.toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [activeFilter, projects]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className={`text-4xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>My Projects</h2>
          <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>View and track all projects you&apos;re part of</p>
        </div>
        <ProjectFilter activeFilter={activeFilter} onChange={setActiveFilter} />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MemberProjectsContent;

import { api } from "../config/http";
import { displayNameFromUser } from "./userRole";

/** Rows for ProjectsColumns / AllProjectsTable (project-service + auth users directory). */
export function mapProjectsToTableRows(projects, users = []) {
  const byId = new Map((users || []).map((u) => [u.id, u]));
  return (projects || []).map((project) => {
    const mgr = project.managerId != null ? byId.get(project.managerId) : null;
    const memberSlots = Array.isArray(project.members) ? project.members : [];
    const memberLabels = memberSlots.map((m) => {
      if (m && typeof m === "object" && m.userId != null) {
        return displayNameFromUser(byId.get(m.userId)) || `User #${m.userId}`;
      }
      return String(m);
    });
    return {
      id: String(project.id),
      name: project.name,
      managerId: project.managerId,
      projectManager:
        displayNameFromUser(mgr) || (project.managerId != null ? `Manager #${project.managerId}` : "—"),
      projectManagerId: project.managerId != null ? String(project.managerId) : "",
      members: memberLabels,
      numOfMembers: memberLabels.length,
      status: "approved",
      submittedDate: "",
      desc: project.description || "",
      startTime: "",
      endTime: "",
    };
  });
}

export async function fetchAdminProjectsTableRows() {
  const [projRes, usersRes] = await Promise.all([
    api.get("/api/projects"),
    api.get("/api/admin/users").catch(() => ({ data: [] })),
  ]);
  return mapProjectsToTableRows(projRes.data, usersRes.data || []);
}

/**
 * Maps auth-service role list (Admin, Manager, User, …) to dashboard buckets.
 * Backend stores "User" for team members; UI treats that as "Member".
 */
export function primaryRole(roles) {
  const r = Array.isArray(roles) ? roles : [];
  if (r.includes("Admin")) return "Admin";
  if (r.includes("Manager")) return "Manager";
  return "Member";
}

export function displayNameFromUser(u) {
  if (!u) return "";
  const n = `${u.firstName || ""} ${u.lastName || ""}`.trim();
  return n || u.userName || (u.id != null ? `User #${u.id}` : "");
}

/** Shape expected by ManagerModal when opening from project rows */
export function userToManagerModalShape(u) {
  if (!u) return null;
  const name = displayNameFromUser(u);
  return {
    id: u.id,
    name,
    email: u.userName,
    phone: "—",
    company: "—",
    experience: 0,
    status: u.isApproved ? "approved" : "pending",
    registeredDate: "",
    avatarColor: "#1890ff",
    bio: "",
  };
}

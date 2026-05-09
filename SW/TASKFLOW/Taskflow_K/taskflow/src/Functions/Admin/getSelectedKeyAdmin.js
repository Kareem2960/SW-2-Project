const getSelectedKeyAdmin = (pathname) => {
  if (pathname === "/admin" || pathname === "/admin/dashboard") return "1";
  if (pathname.includes("/admin/users") || pathname.includes("/admin/projects"))
    return "2";
  if (
    pathname.includes("/admin/requests") ||
    pathname.includes("/admin/managers") ||
    pathname.includes("/admin/project-requests")
  )
    return "3";
  if (pathname.includes("/admin/settings")) return "5";

  return "1"; // Default
};

export default getSelectedKeyAdmin;

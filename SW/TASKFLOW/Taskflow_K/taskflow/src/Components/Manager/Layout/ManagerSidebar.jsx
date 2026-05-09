import React from "react";
import { NavLink } from "react-router-dom";
import { FiFolder, FiHome, FiUsers } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { primaryColor } from "../../../Constants/Colors";
import { useTheme } from "../../../Context/DarkModeProvider";

const links = [
  { to: "/manager", label: "Dashboard", icon: FiHome, end: true },
  { to: "/manager/projects", label: "Projects", icon: FiFolder },
  { to: "/manager/teams", label: "Teams", icon: FiUsers },
];

const baseLinkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors";

const ManagerSidebar = () => {
  const { isDarkMode } = useTheme();

  return (
    <aside
      className={`sticky top-0 hidden h-screen w-64 shrink-0 border-r md:flex md:flex-col ${
        isDarkMode ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white"
      }`}
    >
      <div className={`flex items-center gap-2 border-b px-6 py-5 ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <HiAdjustmentsHorizontal />
        </div>
        <span className={`text-base font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>TaskFlow</span>
      </div>

      <nav className="space-y-1 overflow-y-auto px-4 py-5">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive
                  ? "text-white"
                  : isDarkMode
                    ? "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`
            }
            style={({ isActive }) =>
              isActive ? { backgroundColor: primaryColor } : undefined
            }
          >
            <Icon className="h-4 w-4" style={{ color: "inherit" }} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={`mt-auto border-t p-4 ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
        <button
          type="button"
          className={`w-full rounded-lg px-3 py-2 text-sm font-medium ${
            isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
          }`}
        >
          Project Manager
        </button>
      </div>
    </aside>
  );
};

export default ManagerSidebar;

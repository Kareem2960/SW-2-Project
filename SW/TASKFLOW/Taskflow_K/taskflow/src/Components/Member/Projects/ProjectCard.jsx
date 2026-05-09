import React from "react";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiFolder,
  FiUsers,
} from "react-icons/fi";
import { green, primaryColor, purple } from "../../../Constants/Colors";
import { useTheme } from "../../../Context/DarkModeProvider";

const statusStyles = {
  active: { backgroundColor: `${green}1A`, color: green },
  planning: { backgroundColor: `${primaryColor}1A`, color: primaryColor },
  completed: { backgroundColor: `${purple}1A`, color: purple },
};

const ProjectCard = ({
  id,
  name,
  manager,
  dueDate,
  progress,
  tasksDone,
  tasksTotal,
  teamMembers,
  status,
  description,
  managerInitials,
  tasks = [],
  members = [],
}) => {
  const { isDarkMode } = useTheme();
  const safeProgress = Math.max(0, Math.min(progress || 0, 100));
  const statusStyle = statusStyles[(status || "").toLowerCase()] || {
    backgroundColor: "#f1f5f9",
    color: "#475569",
  };

  return (
    <Link
      to={String(id ?? "")}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
    <article className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <FiFolder className="h-4 w-4" />
          </span>
          <h3 className={`truncate text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{name}</h3>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize"
          style={statusStyle}
        >
          {status}
        </span>
      </div>

      <p className={`mt-4 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{description}</p>

      <div className="mt-6">
        <div className={`mb-2 flex items-center justify-between text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
          <span>Progress</span>
          <span>{safeProgress}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ backgroundColor: `${primaryColor}22` }}>
          <div
            className="h-2 rounded-full"
            style={{ width: `${safeProgress}%`, backgroundColor: primaryColor }}
          />
        </div>
      </div>

      <div className={`mt-4 space-y-2 text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FiClock className="h-3.5 w-3.5" />
            Tasks
          </span>
          <span>
            {tasksDone} / {tasksTotal}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FiUsers className="h-3.5 w-3.5" />
            Team
          </span>
          <span>{teamMembers} members</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FiCalendar className="h-3.5 w-3.5" />
            Due
          </span>
          {dueDate}
        </div>
      </div>

      {/* Tasks List */}
      {tasks.length > 0 && (
        <div className={`mt-4 border-t pt-3 ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
          <p className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Tasks:</p>
          <div className="space-y-1">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className={`text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                • {task.title}
              </div>
            ))}
            {tasks.length > 3 && (
              <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                +{tasks.length - 3} more tasks
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Members List */}
      {members.length > 0 && (
        <div className={`mt-4 border-t pt-3 ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
          <p className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Team Members:</p>
          <div className="space-y-1">
            {members.slice(0, 3).map((member) => (
              <div key={member.userId} className={`text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                • {member.firstName} {member.lastName}
              </div>
            ))}
            {members.length > 3 && (
              <div className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                +{members.length - 3} more members
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`mt-4 border-t pt-3 ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ backgroundColor: purple }}
          >
            {managerInitials}
          </span>
          <div>
            <p className={`text-[10px] ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Project Manager</p>
            <p className={`text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>{manager}</p>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ProjectCard;

import React from "react";
import { green, purple, red } from "../../../../Constants/Colors";
import { useTheme } from "../../../../Context/DarkModeProvider";

const priorityStyles = {
  high: { backgroundColor: `${red}1A`, color: red },
  medium: { backgroundColor: `${purple}1A`, color: purple },
  low: { backgroundColor: `${green}1A`, color: green },
};

const TaskCard = ({
  title,
  project,
  dueDate,
  priority = "medium",
  statusLabel,
  onClick,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-3 text-left transition hover:shadow-sm ${
        isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className={`text-sm font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{title}</h4>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={priorityStyles[priority] || priorityStyles.medium}
        >
          {priority}
        </span>
      </div>
      <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{project}</p>
      <div className="mt-3 flex items-center justify-between text-[11px]">
        <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Due {dueDate}</span>
        <span className={`rounded-full px-2 py-0.5 ${isDarkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"}`}>{statusLabel}</span>
      </div>
    </button>
  );
};

export default TaskCard;

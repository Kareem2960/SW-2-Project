import React from "react";
import { useTheme } from "../../../Context/DarkModeProvider";

const ProjectFilter = ({ activeFilter, onChange }) => {
  const { isDarkMode } = useTheme();
  const filters = ["All", "active", "planning"];

  return (
    <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${
            activeFilter === filter
              ? isDarkMode
                ? "bg-slate-700 text-slate-100 shadow-sm"
                : "bg-white text-slate-800 shadow-sm"
              : isDarkMode
                ? "text-slate-300"
                : "text-slate-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;

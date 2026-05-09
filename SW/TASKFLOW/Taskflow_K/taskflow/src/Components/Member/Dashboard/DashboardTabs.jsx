import React from "react";
import { useTheme } from "../../../Context/DarkModeProvider";

const DashboardTabs = ({ tabs, activeTab, onChange }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`mt-6 inline-flex items-center rounded-lg p-1 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-md px-4 py-1.5 text-xs font-medium transition ${
              isActive
                ? isDarkMode
                  ? "bg-slate-700 text-slate-100 shadow-sm"
                  : "bg-white text-slate-900 shadow-sm"
                : isDarkMode
                  ? "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default DashboardTabs;

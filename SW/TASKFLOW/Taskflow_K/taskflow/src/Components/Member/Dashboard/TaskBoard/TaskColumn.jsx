import React from "react";
import TaskCard from "./TaskCard";
import { useTheme } from "../../../../Context/DarkModeProvider";

const columnStyles = {
  todo: "border-amber-200 bg-amber-50/50",
  progress: "border-blue-200 bg-blue-50/50",
  done: "border-emerald-200 bg-emerald-50/40",
};

const TaskColumn = ({ title, count, items, tone, onTaskClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`rounded-2xl border p-4 ${
        isDarkMode ? "border-slate-700 bg-slate-900" : columnStyles[tone] || "border-slate-200 bg-white"
      }`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h3 className={`text-sm font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
          {title} ({count})
        </h3>
      </header>

      <div className="space-y-3">
        {items.map((task) => (
          <TaskCard key={task.id} {...task} onClick={() => onTaskClick?.(task)} />
        ))}
      </div>
    </section>
  );
};

export default TaskColumn;

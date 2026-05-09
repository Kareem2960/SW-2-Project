import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useTheme } from "../../../Context/DarkModeProvider";

const OverdueAlert = ({ overdueCount = 0 }) => {
  const { isDarkMode } = useTheme();

  if (!overdueCount) {
    return null;
  }

  return (
    <div
      className={`mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 ${
        isDarkMode ? "border-rose-900 bg-rose-950/40 text-rose-300" : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="text-sm font-semibold">You have {overdueCount} overdue tasks</p>
        <p className="text-xs opacity-90">Please review and update these tasks as soon as possible.</p>
      </div>
    </div>
  );
};

export default OverdueAlert;

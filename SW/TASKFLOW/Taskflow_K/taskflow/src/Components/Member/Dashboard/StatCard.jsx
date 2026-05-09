import React from "react";
import {
  FiAlertCircle,
  FiCheckSquare,
  FiClipboard,
  FiClock,
  FiTarget,
} from "react-icons/fi";
import { green, primaryColor, purple, red } from "../../../Constants/Colors";
import { useTheme } from "../../../Context/DarkModeProvider";

const iconMap = {
  tasks: FiClipboard,
  completed: FiCheckSquare,
  inprogress: FiTarget,
  todo: FiClock,
  overdue: FiAlertCircle,
};

const colorMap = {
  primary: primaryColor,
  green,
  orange: primaryColor,
  purple,
  red,
};

const StatCard = ({ title, value, subtitle, iconName, colorTheme = "primary" }) => {
  const { isDarkMode } = useTheme();
  const Icon = iconMap[iconName] || FiClipboard;
  const iconColor = colorMap[colorTheme] || colorMap.primary;

  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{title}</p>
          <h3 className={`mt-3 text-3xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{value}</h3>
          <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>
        </div>
        <span
          className="rounded-full border p-2"
          style={{ color: iconColor, borderColor: `${iconColor}40`, backgroundColor: `${iconColor}14` }}
        >
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </span>
      </div>
    </div>
  );
};

export default StatCard;
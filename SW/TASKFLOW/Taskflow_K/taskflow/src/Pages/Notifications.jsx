import React from "react";
import { FiBell, FiCheckCircle, FiClock, FiEdit3, FiUserPlus } from "react-icons/fi";
import { useNotifications } from "../Context/NotificationsProvider";
import { useTheme } from "../Context/DarkModeProvider";

const toneByType = {
  assigned: "bg-blue-50 text-blue-600",
  updated: "bg-amber-50 text-amber-600",
  comment: "bg-emerald-50 text-emerald-600",
};

const iconByType = {
  assigned: FiUserPlus,
  updated: FiEdit3,
  comment: FiCheckCircle,
};

const relativeTime = (createdAt) => {
  const diffSec = Math.max(1, Math.floor((Date.now() - createdAt) / 1000));
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} minutes ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
  return `${Math.floor(diffSec / 86400)} days ago`;
};

const Notifications = () => {
  const { notifications, clearNotifications } = useNotifications();
  const { isDarkMode } = useTheme();

  return (
    <section className="mx-auto w-full max-w-4xl space-y-5">
      <header>
        <h2 className={`text-3xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>Notifications</h2>
        <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Stay updated with your task assignments and changes.</p>
      </header>

      <div className={`rounded-2xl border p-4 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FiBell className={`h-4 w-4 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`} />
            <p className={`text-sm font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Recent Updates</p>
          </div>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearNotifications}
              className={`rounded-md px-2 py-1 text-xs ${isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}
            >
              Clear all
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>No notifications yet.</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((item) => {
              const Icon = iconByType[item.type] || FiCheckCircle;
              const tone = toneByType[item.type] || "bg-slate-100 text-slate-600";
              return (
                <article key={item.id} className={`flex items-start gap-3 rounded-lg border p-3 ${isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-100"}`}>
                  <span className={`rounded-full p-2 ${tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-sm font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{item.title}</h3>
                    <p className={`mt-0.5 text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{item.message}</p>
                    <p className={`mt-1 flex items-center gap-1 text-[11px] ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                      <FiClock className="h-3 w-3" />
                      {relativeTime(item.createdAt)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Notifications;

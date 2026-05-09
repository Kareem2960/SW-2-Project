import React, { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import ProfileForm from "../Components/Settings/ProfileForm";
import SecuritySettings from "../Components/Settings/SecuritySettings";
import { useTheme } from "../Context/DarkModeProvider";

const tabs = [
  { id: "profile", label: "Profile", icon: <FiUser className="h-3.5 w-3.5"/> },
  { id: "security", label: "Security", icon: <FiLock className="h-3.5 w-3.5"/> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { isDarkMode } = useTheme();

  return (
    <section className="mx-auto w-2/3 max-w-5xl space-y-5">
      <div>
        <h2 className={`text-4xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>Settings</h2>
        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Manage your account settings and preferences</p>
      </div>

      <div className={`inline-flex rounded-xl p-1 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"}`}>
        {tabs.map(({ id, label,icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeTab === id
                ? isDarkMode
                  ? "bg-slate-700 text-slate-100 shadow-sm"
                  : "bg-white text-slate-900 shadow-sm"
                : isDarkMode
                  ? "text-slate-300 hover:bg-slate-700 hover:text-slate-100"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && <ProfileForm />}
      {activeTab === "security" && <SecuritySettings />}
    </section>
  );
};

export default Settings;

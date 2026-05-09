import React from "react";
import { FiMail, FiPhone, FiSave } from "react-icons/fi";
import { useTheme } from "../../Context/DarkModeProvider";
import { primaryColor } from "../../Constants/Colors";

const ProfileForm = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-4">
      <article className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Personal Information</h3>
        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Update your personal details and profile information</p>

        <div className="mt-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white" style={{ backgroundColor: primaryColor }}>
            E
          </div>
          <div>
            <button
              type="button"
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${isDarkMode ? "border-slate-600 bg-slate-800 text-slate-200" : "border-slate-300 bg-white text-slate-700"}`}
            >
              Change Photo
            </button>
            <p className="mt-1 text-xs text-slate-400">JPG, PNG or GIF. Max size 2MB</p>
          </div>
        </div>

        <form className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Full Name</span>
            <input
              type="text"
              defaultValue="Emma Wilson"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiMail className="h-3.5 w-3.5" />
              Email Address
            </span>
            <input
              type="email"
              defaultValue="dev1@taskflow.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <label className="block">
            <span className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FiPhone className="h-3.5 w-3.5" />
              Phone Number
            </span>
            <input
              type="text"
              defaultValue="+1 (555) 123-4567"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Bio</span>
            <textarea
              rows={4}
              defaultValue="Team member focused on delivering high-quality work."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            <FiSave className="h-4 w-4" />
            Save Changes
          </button>
        </form>
      </article>

      <article className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>Account Information</h3>
        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Your account details and role</p>

        <div className="mt-5 divide-y divide-slate-100">
          <div className="flex items-start justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Account Type</p>
              <p className="text-xs text-slate-500">Your current role</p>
            </div>
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              Team Member
            </span>
          </div>

          <div className="flex items-start justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Member Since</p>
              <p className="text-xs text-slate-500">Account creation date</p>
            </div>
            <span className="text-sm text-slate-700">January 15, 2024</span>
          </div>

          <div className="flex items-start justify-between py-3">
            <div>
              <p className="text-sm font-medium text-slate-700">Account Status</p>
              <p className="text-xs text-slate-500">Current status</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
              Active
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProfileForm;

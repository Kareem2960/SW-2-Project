import { FiLock } from "react-icons/fi";
import { useTheme } from "../../Context/DarkModeProvider";
import { primaryColor } from "../../Constants/Colors";

const SecuritySettings = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-4">
      <article
        className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}
      >
        <h3
          className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}
        >
          Change Password
        </h3>
        <p
          className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
        >
          Update your password to keep your account secure
        </p>

        <form className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Current Password
            </span>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              New Password
            </span>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              Password must be at least 8 characters long
            </p>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Confirm New Password
            </span>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </label>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            <FiLock className="h-4 w-4" />
            Change Password
          </button>
        </form>
      </article>

      <article
        className={`rounded-2xl border p-5 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}
      >
        <h3
          className={`text-lg font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}
        >
          Two-Factor Authentication
        </h3>
        <p
          className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
        >
          Add an extra layer of security to your account
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">Enable 2FA</p>
            <p className="text-xs text-slate-500">
              Require a verification code in addition to your password
            </p>
          </div>
          <button
            type="button"
            aria-label="Toggle two-factor authentication"
            className="relative h-6 w-11 rounded-full bg-slate-200"
          >
            <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Two-factor authentication is currently disabled. Enable it to secure
          your account.
        </p>
      </article>
    </div>
  );
};

export default SecuritySettings;
